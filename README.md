# Loja Lunar

Catálogo de serviços da Loja Lunar com modalidades de serviço, carrinho, pedido pelo WhatsApp e painel administrativo protegido pelo Firebase Authentication.

## Estrutura

- `index.html`: interface do catálogo, carrinho e modais.
- `app.js`: integração com Firebase, catálogo, carrinho e administração.
- `style.css`: estilos responsivos.
- `firestore.rules`: leitura pública dos serviços e escrita restrita ao administrador.

## Firebase

Projeto: `loja-lunar-catalogo`

```bash
firebase deploy
```

O acesso administrativo é aberto ao clicar na logo da Loja Lunar.
