provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "allow_ssh" {
  name_prefix = "allow_ssh"
  
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 31001
    to_port = 31001
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 6443
    to_port = 6443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "brick_ec2" {
  ami = var.ami_id
  instance_type = var.instance_size
  key_name = var.ssh_key
  subnet_id = var.subnet_1
  root_block_device {
    volume_size           = "20"
    volume_type           = "gp2"
    encrypted             = true
    // kms_key_id            = aws_kms_key.kopi-kms-key.key_id      
    delete_on_termination = true
  }
//   user_data = <<-EOF
//               #!/bin/bash
//               echo "Hello, World" > index.html
//               nohup busybox httpd -f -p 8080 &
//               EOF
  
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]
  
  tags = {
    Name = "brick-instance"
  }
}

resource "aws_eip" "brick_eip" {
  instance = aws_instance.brick_ec2.id
  vpc      = true
}

resource "aws_lb" "brick_lb" {
  name = var.lb_name
  internal = false
  load_balancer_type = "application"
  
  security_groups = [aws_security_group.allow_ssh.id]
  subnets = [var.subnet_1, var.subnet_2]
  
  tags = {
    Name = "brick-lb"
  }
}

resource "aws_lb_listener" "brick_lb_listener" {
  load_balancer_arn = aws_lb.brick_lb.arn
  port = 80
  protocol = "HTTP"
  
  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.brick_tg.arn
  }
}

resource "aws_lb_target_group" "brick_tg" {
  name_prefix = "brk"
  
  target_type = "instance"
  port = 80
  protocol = "HTTP"
  
  vpc_id = var.vpc_id
  
  health_check {
    path = "/"
    protocol = "HTTP"
  }
  
  tags = {
    Name = "brick-tg"
  }
}

resource "aws_lb_target_group_attachment" "brick_tg_attach" {
  target_group_arn = aws_lb_target_group.brick_tg.arn
  target_id        = aws_instance.brick_ec2.id
  port             = 80
}

data "aws_route53_zone" "brick_r53_zone" {
  name         = var.hosted_zone_name
  private_zone = false
}

resource "aws_route53_record" "brick_r53_record" {
  zone_id = data.aws_route53_zone.brick_r53_zone.zone_id
  name = var.hosted_zone_name
  type = "A"
  alias {
    name = aws_lb.brick_lb.dns_name
    zone_id = aws_lb.brick_lb.zone_id
    evaluate_target_health = true
  }
}
