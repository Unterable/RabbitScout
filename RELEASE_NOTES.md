# v1.0.0 - Initial Release with Docker Support

## 🚀 Features
- Modern, responsive alternative to the default RabbitMQ Management UI
- Real-time monitoring and queue insights
- Built with Next.js and shadcn/ui
- Docker support with GitHub Container Registry integration

## 🐳 Docker Usage
You can now use RabbitScout with Docker:

```yaml
services:
  rabbitscout:
    image: ghcr.io/ralve-org/rabbitscout:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_RABBITMQ_HOST=your-rabbitmq-host
      - NEXT_PUBLIC_RABBITMQ_PORT=15672
      - NEXT_PUBLIC_RABBITMQ_VHOST=/
      - RABBITMQ_USERNAME=your-username
      - RABBITMQ_PASSWORD=your-password
      - NEXT_PUBLIC_API_URL=http://localhost:3000
```

All environment variables are required:
- `NEXT_PUBLIC_RABBITMQ_HOST`: Your RabbitMQ server hostname
- `NEXT_PUBLIC_RABBITMQ_PORT`: RabbitMQ management port (default: 15672)
- `NEXT_PUBLIC_RABBITMQ_VHOST`: RabbitMQ virtual host (default: /)
- `RABBITMQ_USERNAME`: RabbitMQ username
- `RABBITMQ_PASSWORD`: RabbitMQ password
- `NEXT_PUBLIC_API_URL`: URL where RabbitScout is accessible (default: http://localhost:3000)
