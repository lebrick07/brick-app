# Deploy infra using Terraform

## Run following commands

### Init
```
cd terraform
terraform init
```
### Plan
```
terraform plan -var db_password="YOUR_DB_PASSWORD"
```
### Apply
```
terraform apply -var db_password="YOUR_DB_PASSWORD"
```