terraform {
  backend "s3" {
    bucket = "brick-tf-state"
    key    = "brick-tf-state"
    region = "us-east-1"
  }
}
