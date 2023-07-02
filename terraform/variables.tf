// variable "ami_id" {
//     default = "ami-0c85867a12dc216ec"
//     description = "Ubuntu AMI"
// }

// variable "ami_id" {
//     default = "ami-0557a15b87f6559cf"
//     description = "Ubuntu AMI"
// }

variable "ami_id" {
    default = "ami-0030830e3cf28bd80"
    description = "Ubuntu AMI (lastest)"
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

variable "db_name" {
    default = "brickdb"
    description = "DB name"
}

variable "db_version" {
    default = 5.7
    description = "DB version"
}

variable "db_instance_class" {
    default = "db.t3.micro"
    description = "DB class"
}

variable "db_username" {
    default = "brickuser"
    description = "DB Username"
}

variable "db_password" {
    default = ""
    description = "DB Password"
}

variable "db_pg_name" {
    default = "default.mysql5.7"
    description = "DB paramater group name"
}






