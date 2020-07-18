# Clipping
Este projeto utiliza as principais tecnologias:

[ ![](./assets/node.png) ](https://nodejs.org/) [ ![](./assets/vue.png) ](https://vuejs.org/) [ ![](./assets/electron.png) ](https://www.electronjs.org/)  [ ![](./assets/bitly.png)](https://bitly.com/)

### Crie uma conta no [bitly](https://bitly.com/) e gere um Token para utilizar a api para encurtar as URL
Account/Profile Settings/Generic Access Token

![](./assets/bitly-token.gif)

### Cole o Token em **menu/preferências**. Você também poderá alterar os outros valores se desejar
depois de incluir o Token já é possível incluir as notícias e utilizar o encurtador de URL da Bitly

![](./assets/clipping-token.gif)

### **Scrape** para contornar as políticas de [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS) é preciso utilizar um Proxy que adiciona cabeçalhos à solicitação AJAX.
O ideal é configurar seu próprio servidor proxy [veja como criar seu servidor proxy aqui](https://github.com/izidorio/proxy-cors)
<br>Para ver o Scrape funcionando você pode usar o proxy  https://cors-anywhere.herokuapp.com como exemplo.  
![](./assets/clipping-proxy.gif)

### Copie o clipping para área de transferência e cole no seu WhatsApp
![](./assets/clipping-copy.gif)

### Clone o projeto 
```
git clone git@github.com:izidorio/clipping.git
```
### No diretório raiz do projeto instale as dependências
```
cd clipping
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compila e minimiza para produção em SPA
```
npm run build
```
Veja um exemplo de uma [SPA rodando](https://clipping.bentoweb.com.br/)

### Compila o executável com Electorn
```
npm run electron:build
```





