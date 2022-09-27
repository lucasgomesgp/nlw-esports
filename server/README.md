## Back-end

## Entidades

## Game ( 1 game tem vários anúncios)
id
title
bannerUrl - Caso fosse para fazer o upload da imagem seria necessário usar um serviço específico para isso, como o Amazon S3, e usar um CDN para servir esses arquivos e entregar a URL da imagem
.

## Ad
id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt

## Casos de uso

- Listagem de games com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncio por game
- Buscar discord pelo ID do anúncio

Tipos de parâmetros:
    Query: localhost:3333/ads?page=2&sort=title -> Vem na URL
    Route: localhost:3333/ads/5 ou um slug (como-criar-uma-api-em-node) -> Identificação de recurso
    Body: -> Envio de várias informações em uma requisição/ para informações sensíveis
