const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', ()=>{
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) =>{ /* Promise é algo que não sabemos se vai dar certo  ou não, fazendo um procedimento assíncrono | Promise der certa = resolve; Promise der errado = reject */
        const leitor = new FileReader(); /* Leitor de arquivo */
        leitor.onload = ()=>{ /* Quando houver o carregamento */
            resolve({ url: leitor.result, nome: arquivo.name}); /* Retorna a URL do arquivo(result) e nome do arquivo */
        }

        leitor.onerror = ()=>{ /* Se a leitura der errado */
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo); /* Ler os dados do arquivo como uma URL*/
    });
}

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (evento)=>{ /* Quando acontecer alguma mudança no input */
    const arquivo = evento.target.files[0]; /* Pegar o arquivo que está sendo enviado */
    if(arquivo){
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); //Espera a função lerConteudoDoArquivo terminar.
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }catch(erro){
            console.log('Erro na leitura do arquivo.');
            
        }
    }

})

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener('click', (evento)=>{
    if(evento.target.classList.contains('remove-tag')){
        const novaTagQueQueremosRemover = evento.target.parentElement; // pega a <li>
        listaTags.removeChild(novaTagQueQueremosRemover);
    }
})

const tagsDisponiveis = ['Front-end', 'Programação', 'Data Science', 'Full-stack', 'HTML', 'CSS', 'JavaScript'];

async function verificarTagsDisponiveis(tagTexto){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

inputTags.addEventListener('keypress', async (evento)=>{ // keypress monitora as teclas do teclado
    if(evento.key === 'Enter'){ // se a o evento da tecla for enter
        evento.preventDefault();
        const tagTexto = inputTags.value.trim(); /* trim remove todos os espaços em branco antes e depos da palavra */
        if(tagTexto !== ''){
            try{
            const tagExiste = await verificarTagsDisponiveis(tagTexto);
            if(tagExiste){
            const tagNova = document.createElement('li');
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(tagNova);
            inputTags.value = "";
            }else{
                alert('Tag não foi encontrada.');
            }
            }catch(error){
                console.error('Erro a o verificar a existência da tag');
                alert('Erro ao verificar a existência da tag. Verifique o console');
            }
        }
    }
})
const botaoPublicar = document.querySelector('.botao-publicar');

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const deuCerto = Math.random() > 0.5; /* Se o Math.random for maior que 0.5 */

            if(deuCerto){
                resolve('Projeto publicado com suceesso');
            }else{
                reject('Erro ao publicar o projeto');
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener('click', async (evento)=>{
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag)=> tag.textContent); /* Cria uma lista de todas as tags que existem. tag.textContent para retornar apenas o conteúdo textual */

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert('Deu tudo certo');
    }catch(error){
        console.log('Deu errado: ', error);
        alert('Deu tudo errado!');
    }
})

const botaoDescartar = document.querySelector('.botao-descartar');

botaoDescartar.addEventListener('click', (evento)=>{
    evento.preventDefault();

    const formulario = document.querySelector('form');
    formulario.reset();

    imagemPrincipal.src = './img/imagem1.png';
    nomeDaImagem.textContent = 'image_projeto.png';

    listaTags.innerHTML = '';
})