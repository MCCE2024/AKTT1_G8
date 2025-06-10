# Webshop Helm Chart

This chart deploys the complete webshop stack, including:

- Frontend
- Cart Service
- Payment Service
- Product Service

## Usage

```sh
helm dependency update Charts/webshop
helm upgrade --install webshop Charts/webshop --namespace aktt1
```

You can override values for each subchart in `values.yaml`.
