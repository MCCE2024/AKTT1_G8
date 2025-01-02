#!/bin/bash

services=("product-service" "cart-service" "payment-service")
frontends=("frontend" "hello-world")

printf "\n\n==== Deploying ConfigMaps ====\n"
kubectl apply -f ./Charts/node-microservice-chart/overlays/product-service/cm.yaml
printf "==== Deployed ConfigMaps ====\n\n"

for service in "${services[@]}"; do
  printf "\n\n==== Deploying $service ====\n"
  helm upgrade --install "$service" ./Charts/node-microservice-chart \
    -f ./Charts/node-microservice-chart/values.yaml \
    -f ./Charts/node-microservice-chart/overlays/$service/values.yaml \
    --namespace=aktt1
  printf "==== Deployed $service ====\n\n"
done

for frontend in "${frontends[@]}"; do
  printf "\n\n==== Deploying $frontend ====\n"
  kubectl apply -f ./$frontend/$frontend.yaml
  printf "==== Deployed $frontend ====\n\n"
done