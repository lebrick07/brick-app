// variable "ami_id" {
//     default = "ami-0c85867a12dc216ec"
//     description = "Ubuntu AMI"
// }

variable "ami_id" {
    default = "ami-0557a15b87f6559cf"
    description = "Ubuntu AMI"
}

variable "ssh_key" {
    default = "brick-key"
    description = "SSH Key"
}

variable "instance_size" {
    default = "t2.large"
    description = "Instance size"
}

variable "subnet_1" {
    default = "subnet-5fcc5300"
    description = "Public subnet 1"
}

variable "subnet_2" {
    default = "subnet-12842223"
    description = "Public subnet 2"
}

variable "vpc_id" {
    default = "vpc-504ce32d"
    description = "VPC ID"
}

variable "hosted_zone_name" {
    default = "autometalabs.io."
    description = "Hosted zone name"
}

variable "dns_name" {
    default = "brick.autometalabs.io"
    description = "DNS name"
}

variable "lb_name" {
    default = "brick-lb"
    description = "ALB name"
}

variable "lb_ssl_arn" {
    default = "arn:aws:acm:us-east-1:216026633254:certificate/3b239dcb-0906-41ca-b477-9a912c60cb98"
    description = "SSL ARN"
}

