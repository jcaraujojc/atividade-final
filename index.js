import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let listaInteressados = [];
let listaPet = [];

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));
app.use(cookieParser());

function usuarioEstaAutenticado(req, resp, next) {
    if (req.session.usuarioAutenticado) {
        next();
    } else {
        resp.redirect('/login.html');
    }
}

function cadastrarInteressados(req, resp) {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    if (nome && email && telefone) {
        listaInteressados.push({
            nome: nome,
            email: email,
            telefone: telefone
        });
        resp.redirect('/listarInteressados');
    } else {
        resp.write(`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Interessados</title>
            <style>
                .container {
                    max-width: 1000px;
                    border: 2px solid black;
                    border-radius: 15px;
                    background-color: rgb(174, 130, 98);
                    padding: 40px;
                    margin-top: 50px;
                }
                .col-md-6{
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    font-weight: bold;
                }
                .fundo{
                    background-color: rgb(223, 193, 174);
                }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body class="fundo">
            <div class="container">
                <h2 style="text-align: center; font-family: Verdana, Geneva, Tahoma, sans-serif;">Cadastro de Interessados</h2>
                <form action="/cadastrarInteressados" method="POST" class="row g-3 needs-validation" novalidate>
                    <div class="col-md-6">
                      <label for="nome" class="form-label">Nome:</label>
                      <input type="text" class="form-control input" id="nome" name="nome" placeholder="Informe o seu nome" value="${nome || ''}" required>`);
        if (!nome) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
           Informe o seu nome.
        </div>`);
        }
        resp.write(`</div>
        <div class="col-md-6">
          <label for="email" class="form-label">Email:</label>
          <div class="input-group has-validation">
            <input type="email" placeholder="Informe o seu email" class="form-control" name="email" id="email" value="${email || ''}" aria-describedby="inputGroupPrepend" required>
            <span class="input-group-text" id="inputGroupPrepend">@</span>`);
        if (!email) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
            Informe o seu email.
         </div>`);
        }
        resp.write(`</div>
        </div>
        <div class="col-md-6">
          <label for="telefone" class="form-label">Telefone:</label>
          <input type="tel" placeholder="Informe o seu telefone" class="form-control" id="telefone" name="telefone" value="${telefone || ''}" required>`);
        if (!telefone) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
            Informe o seu telefone.
         </div>`);
        }
        resp.write(`</div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
            <a class="btn btn-secondary" href="/">Voltar</a>
        </div>
      </form>
    </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
    </html>`);
        resp.end();
    }
}

function listarInteressados(req, res) {
    let htmlresposta = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Interessados</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container border mt-5">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>`;

    listaInteressados.forEach(interessado => {
        htmlresposta += `
                    <tr>
                        <td>${interessado.nome}</td>
                        <td>${interessado.email}</td>
                        <td>${interessado.telefone}</td>
                    </tr>`;
    });

    htmlresposta += `
                </tbody>
            </table>
            <a class="btn btn-primary" href="/">Voltar</a>
        </div>
    </body>
    </html>`;

    res.send(htmlresposta);
}

function cadastrarPet(req, resp) {
    const nomeCachorro = req.body.nomeCachorro;
    const raca = req.body.raca;
    const idade = req.body.idade;

    if (nomeCachorro && raca && idade) {
        listaPet.push({
            nomeCachorro: nomeCachorro,
            raca: raca,
            idade: idade
        });
        resp.redirect('/listarPet');
    } else {
        resp.write(`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Pet</title>
            <style>
                .container {
                    max-width: 1000px;
                    border: 2px solid black;
                    border-radius: 15px;
                    background-color: rgb(174, 130, 98);
                    padding: 40px;
                    margin-top: 50px;
                }
                .col-md-6{
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    font-weight: bold;
                }
                .fundo{
                    background-color: rgb(223, 193, 174);
                }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body class="fundo">
            <div class="container">
                <h2 style="text-align: center; font-family: Verdana, Geneva, Tahoma, sans-serif;">Cadastro de Pet</h2>
                <form method="POST" action="/cadastrarPet" class="row g-3 needs-validation" novalidate>
                    <div class="col-md-6">
                      <label for="nomeCachorro" class="form-label">Nome do cachorro:</label>
                      <input type="text" class="form-control input" id="nomeCachorro" name="nomeCachorro" value="${nomeCachorro || ''}" placeholder="Informe o nome do cachorro" required>`);
        if (!nomeCachorro) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
                          Informe o nome do cachorro.
                       </div>`);
        }
        resp.write(`</div>
                      <div class="col-md-6">
                        <label for="raca" class="form-label">Raça:</label>
                          <input type="text" placeholder="Informe a raça do cachorro" class="form-control" name="raca" id="raca" value="${raca || ''}" required>`);
        if (!raca) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
                          Informe a raça do cachorro.
                       </div>`);
        }
        resp.write(` </div>
                      <div class="col-md-6">
                        <label for="idade" class="form-label">Idade:</label>
                        <input type="number" placeholder="Informe a idade do cachorro" class="form-control" id="idade" name="idade" value="${idade || ''}" required>`);
        if (!idade) {
            resp.write(`<div class="m-2 alert alert-danger" role="alert">
                          Informe a idade do cachorro.
                       </div>`);
        }
        resp.write(`</div>
                      <div class="col-12">
                          <button class="btn btn-primary" type="submit">Cadastrar</button>
                          <a class="btn btn-secondary" href="/">Voltar</a>
                      </div>
                    </form>
                  </div>
                  </body>
                  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                  crossorigin="anonymous"></script>
                  </html>`)
    }
}

function listarPet(req, res) {
    let htmlresposta = `<!DOCTYPE html>
                  <html lang="pt-br">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Lista de Pets</title>
                      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                  </head>
                  <body>
                      <div class="container border mt-5">
                          <table class="table table-striped">
                              <thead>
                                  <tr>
                                      <th scope="col">Nome do cachorro</th>
                                      <th scope="col">Raça</th>
                                      <th scope="col">Idade do cachorro</th>
                                  </tr>
                              </thead>
                              <tbody>`;

    listaPet.forEach(pet => {
        htmlresposta += `
                                  <tr>
                                      <td>${pet.nomeCachorro}</td>
                                      <td>${pet.raca}</td>
                                      <td>${pet.idade}</td>
                                  </tr>`;
    });

    htmlresposta += `
                              </tbody>
                          </table>
                          <a class="btn btn-primary" href="/">Voltar</a>
                      </div>
                  </body>
                  </html>`;

    res.send(htmlresposta);
}

function autenticarUsuario(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario == 'admin' && senha == '123') {
        req.session.usuarioAutenticado = true;
        resp.cookie('dataUltimoAcesso', new Date().toLocaleString(),
            {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
        resp.redirect('/');
    } else {
        resp.write('<!DOCTYPE html>');
        resp.write('<html>');
        resp.write('<head>');
        resp.write('<meta charset="utf-8">');
        resp.write('<title>Falha ao realizar login</title>');
        resp.write('</head>');
        resp.write('<body>');
        resp.write('<p>Usuário ou senha inválidos!</p>');
        resp.write('<a href="/login.html">Voltar</a>');
        if (req.cookies.dataUltimoAcesso) {
            resp.write('<p>');
            resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
            resp.write('</p>');
        }
        resp.write('</body>');
        resp.write('</html>');
        resp.end();
    }
}

let listaAdocao = [];


function renderAdocaoPage(req, res) {
    let interessadosOptions = '<option value="">Escolha um interessado</option>';
    let petsOptions = '<option value="">Escolha um pet</option>';


    listaInteressados.forEach(interessado => {
        interessadosOptions += `<option value="${interessado.nome}">${interessado.nome}</option>`;
    });

    
    listaPet.forEach(pet => {
        petsOptions += `<option value="${pet.nomeCachorro}">${pet.nomeCachorro}</option>`;
    });

    
    let interessadosList = '';
    listaInteressados.forEach(interessado => {
        interessadosList += `
            <tr>
                <td>${interessado.nome}</td>
                <td>${interessado.email}</td>
                <td>${interessado.telefone}</td>
            </tr>`;
    });

   
    let petsList = '';
    listaPet.forEach(pet => {
        petsList += `
            <tr>
                <td>${pet.nomeCachorro}</td>
                <td>${pet.raca}</td>
                <td>${pet.idade}</td>
            </tr>`;
    });


    const adocaoPageHTML = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Desejo de Adoção</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container mt-5">
            <h2>Desejo de Adoção</h2>
            <div class="mb-4">
                <h3>Interessados Cadastrados</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${interessadosList}
                    </tbody>
                </table>
            </div>
            <div class="mb-4">
                <h3>Pets Cadastrados</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome do cachorro</th>
                            <th>Raça</th>
                            <th>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${petsList}
                    </tbody>
                </table>
            </div>
            <form method="POST" action="/registrarAdocao">
                <div class="mb-3">
                    <label for="interessado" class="form-label">Interessado</label>
                    <select class="form-select" id="interessado" name="interessado" required>
                        ${interessadosOptions}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="pet" class="form-label">Pet</label>
                    <select class="form-select" id="pet" name="pet" required>
                        ${petsOptions}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Registrar Adoção</button>
            </form>
            <a href="/" class="btn btn-secondary mt-3">Voltar</a>
        </div>
    </body>
    </html>`;

    res.send(adocaoPageHTML);
}


function registrarAdocao(req, res) {
    const interessado = req.body.interessado;
    const pet = req.body.pet;
    const dataManifestacao = new Date().toLocaleString();

    if (interessado && pet) {
        listaAdocao.push({
            interessado: interessado,
            pet: pet,
            dataManifestacao: dataManifestacao
        });
        res.redirect('/listarAdocoes');
    } else {
        res.send('Erro: Interessado e Pet são obrigatórios.');
    }
}


function listarAdocoes(req, res) {
    let htmlResposta = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Adoções</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container mt-5">
            <h2>Lista de Desejos de Adoção</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Interessado</th>
                        <th>Pet</th>
                        <th>Data da Manifestação</th>
                    </tr>
                </thead>
                <tbody>`;

    listaAdocao.forEach(adocao => {
        htmlResposta += `
                    <tr>
                        <td>${adocao.interessado}</td>
                        <td>${adocao.pet}</td>
                        <td>${adocao.dataManifestacao}</td>
                    </tr>`;
    });

    htmlResposta += `
                </tbody>
            </table>
            <a href="/" class="btn btn-secondary mt-3">Voltar</a>
        </div>
    </body>
    </html>`;

    res.send(htmlResposta);
}


app.get('/adotarPet', renderAdocaoPage);
app.post('/registrarAdocao', registrarAdocao);
app.get('/listarAdocoes', listarAdocoes);

app.post('/cadastrarInteressados', usuarioEstaAutenticado, cadastrarInteressados);
app.get('/listarInteressados', usuarioEstaAutenticado, listarInteressados);

app.post('/cadastrarPet', usuarioEstaAutenticado, cadastrarPet);
app.get('/listarPet', usuarioEstaAutenticado, listarPet);

app.post('/login', autenticarUsuario);

app.get('/login', (req, resp) => {
    resp.redirect('login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
});


app.get('/', usuarioEstaAutenticado, (req, res) => {
    const ultimoAcesso = req.cookies.dataUltimoAcesso;

    
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <style>
            .fundo{
                background-color: rgb(223, 193, 174);
            }
    
            .container {
                max-width: 1000px;
                border: 2px solid saddlebrown;
                border-radius: 15px;
                background-color: saddlebrown;
                margin-top: 50px;
            }
    
            .menu {
                margin-top: 50px;
            }
    
            .m {
                border: 2px solid;
                border-radius: 20px;
                margin-right: auto;
                margin-left: auto;
                background-color: white;
                border-color: rgb(84, 42, 12);
                width: 150px;
                margin-right: 20px;
                margin-left: 20px;
                text-align: center;
            }
    
            .cadastro {
                border: 2px solid;
                border-radius: 20px;
                margin-right: auto;
                margin-left: auto;
                background-color: white;
                border-color: rgb(84, 42, 12);
                width: 150px;
                margin-right: 20px;
                margin-left: 20px;
                text-align: center;
            }
    
            .lista {
                border: 2px solid;
                border-radius: 20px;
                margin-right: auto;
                margin-left: auto;
                background-color: white;
                border-color: rgb(84, 42, 12);
                width: 150px;
                margin-right: 20px;
                margin-left: 20px;
                text-align: center;
            }
    
            .nav-link {
                color: inherit;
                text-decoration: none;
                color: black;
            }
    
            .imagem {
               margin-top: 20px;
               max-width: 450px;
               margin-left: 250px;
               margin-right: 250px;
               border-radius: 15px;
               margin-bottom: 30px;
               
            }
            </style>
        </head>
        <body class="fundo">
        <div class="container">
        <div class="menu">
            <ul class="nav justify-content-center">
                <div class="m">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">Menu</a>
                    </li>
                </div>
                <div class="lista">
                    <a class="nav-link" href="/adotarPet" id="listagemDropdown" role="button">
                        Adotar um pet
                    </a>
                </div>
                <div class="lista">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="listagemDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Listagens
                        </a>
                        <ul class="dropdown-menu justify-content-center" aria-labelledby="listagemDropdown">
                            <li>
                                <a class="nav-link dropdown-item" href="/listarInteressados">Listagem de
                                    Interessados</a>
                                <a class="nav-link dropdown-item" href="/listarPet">Listagem de
                                        pet</a>
                            </li>
                        </ul>
                    </li>
                </div>
                <div class="cadastro">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="cadastroDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastros
                        </a>
                        <ul class="dropdown-menu justify-content-center" aria-labelledby="cadastroDropdown">
                            <li>
                                <a class="nav-link dropdown-item" href="/cadastrarInteressados.html">Cadastro de
                                    Interessados</a>
                                <a class="nav-link dropdown-item" href="/cadastrarPet.html">Cadastro de Pet</a>
                            </li>
                    </li>
                        </ul>
                </div>
                <div class="lista">
                    <a class="nav-link" href="/login.html" id="listagemDropdown" role="button">Sair
                    </a>
                </div>
            </ul>
        </div>
        <div class="container">
            <h2 style="text-align: center; margin-top: 30px;font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; color: black;">Pet Shop</h2>
            <img class="imagem" src="cachorro.jpg" alt="cachorro">
        </div>
    </div>
    </div>
        <p>Último acesso: ${ultimoAcesso}</p>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"></script>
        </html>
    `);
});

app.use(express.static(path.join(process.cwd(), 'publico')));
app.use(usuarioEstaAutenticado, express.static(path.join(process.cwd(), 'protegido')));

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});