/* <label class="todo__item">
    <input type="checkbox">
        <div>teste de item 2</div>
    <input type="button" value="X">
</label> */

// let banco = [
//     {'tarefa': 'Estudar JS', 'status': ''},
//     {'tarefa': 'Terminar netflix', 'status': 'checked'}
// ]

// usando o "no coalescing ??" se o getItem do local storage for nulo ou undefined, ele se torna vazio. Mas se tiver algo lá, mantem ele
// Quando vier do storage, tem que tranformar o localstorage.getItem('todoList') em JSON (JSON.parse)
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

// indice server para enumerar os itens, div e etc. para poder excluir 1 so e não todos.
const criarItem = (tarefa, status, indice) => { 
    // Criou o label
    const item = document.createElement('label')
    // Adcionou a classe todo__item
    item.classList.add('todo__item')
    // Adcionar mais elemtos dentro do todo__item
    // propriedade do json para indice -- (data-) 
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
    `
    // Pega o elemento pai(que contem a label) e adciona um elemento que acabamos de criar (item)
    document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => { 
    // recebe o todoList
    const todoList = document.getElementById('todoList')
    // enquanto existir o primeiro filho 
    while(todoList.firstChild) { 
        // remove o ultimo filho da todoList
        todoList.removeChild(todoList.lastChild)
    }

}

const atualizarTela = () => {
    // limpa as tarefas antes de atualizar a tela, pq se atualizar a tela 2x, dobra as tarefas
    limparTarefas() 
    // cria uma const banco para entrarno storage e pegar o que tem la 
    const banco = getBanco()
    // o forEach percorre todo o array (item a item). passa alguns elementos pro callback
    // pega o item, manda pro criarItem e pega so a tarefa e o status
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice))
}

const inserirItem = (evento) => {
    // evento do click da tecla
    const tecla = evento.key
    // cria variavel texto pra buscar o valor do alvo do evento que aconteceu
    const texto = evento.target.value
    // se a tecla for enter, o banco adciona
    if (tecla === 'Enter') { 
        // pega o que tem no banco
        const banco = getBanco()
        // atualiza o que quer no banco
        banco.push ({'tarefa': texto, 'status': ''})
        // envia dnv no banco
        setBanco(banco)
        // adciona o atualizarTela para ver oq foi adcionado
        atualizarTela()
        // limpar tela 
        evento.target.value = ''
    }
}

const removerItem = (indice) => { 
    // splice = remove/ modifica um array
    // a partir do indice que receber, excluir o 1 que é ele proprio que recebeu agora
    banco = getBanco()
    banco.splice(indice,1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    // vai pegar o banco o indice correto o status, pois so modifica o status
    // faz um operador ternario
    // se o status tiver marcado fica 'checked' no banco, se nao, fica ''
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela() 
}

const clickItem = (evento) => {
    // ver em qual elemento clicou
    const elemento = evento.target
    if(elemento.type ==='button') { 
        // pega o elemento, usa o dataset para ver o valor do indice do elemento que foi clicado e depois o nome que passou depois do data, para pegar o valor
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarItem(indice)
     }
}

// evento de pressionar o botão e inserir o item. no caso o Enter
document.getElementById('newItem').addEventListener('keypress', inserirItem)
// evento de registrar o click
document.getElementById('todoList').addEventListener('click', clickItem)

// Toda vez que adciona, edita e etc... uma tarefa.. atualiza a tela
atualizarTela()




