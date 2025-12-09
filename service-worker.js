<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="manifest" href="manifest.json">
<title>Meu Dinheiro - App Financeiro</title>

<link rel="apple-touch-icon" href="icons/icon-512.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: #0d1117;
        color: #e6edf3;
    }

    header {
        background: #161b22;
        padding: 20px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        border-bottom: 1px solid #30363d;
    }

    nav {
        display: flex;
        justify-content: space-around;
        background: #161b22;
        border-bottom: 1px solid #30363d;
        padding: 10px 0;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    nav button {
        background: #21262d;
        border: 1px solid #30363d;
        padding: 10px 14px;
        color: #e6edf3;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;
    }

    nav button:hover {
        background: #30363d;
    }

    .page {
        padding: 20px;
    }

    .hidden {
        display: none !important;
    }

    .card {
        background: #161b22;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #30363d;
    }

    .card h3 {
        margin-top: 0;
        border-bottom: 1px solid #30363d;
        padding-bottom: 10px;
    }

    input, select, textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #30363d;
        border-radius: 6px;
        background: #0d1117;
        color: #e6edf3;
        box-sizing: border-box;
    }

    button {
        background: #2563eb;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background: #1d4ed8;
    }

    .danger {
        background: #da3633;
    }

    .danger:hover {
        background: #a82725;
    }
    
    .list-item {
        background: #161b22;
        padding: 10px;
        margin-bottom: 8px;
        border-radius: 6px;
        border: 1px solid #30363d;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
</head>
<body>

<header>Meu Dinheiro</header>

<nav>
    <button onclick="showPage('dashboard')">Dashboard</button>
    <button onclick="showPage('transacoes')">Transações</button>
    <button onclick="showPage('cadastro')">Cadastro</button>
    <button onclick="showPage('config')">Config.</button>
</nav>

<div id="dashboard" class="page">
    <h2>Visão Geral</h2>

    <div class="card">
        <h3>Despesas por Categoria</h3>
        <canvas id="pizza" height="200"></canvas>
    </div>

    <div class="card">
        <h3>Resumo Geral</h3>
        <p>💰 Receitas: R$ <span id="totalReceitas">0,00</span></p>
        <p>💸 Despesas: R$ <span id="totalDespesas">0,00</span></p>
        <p><strong>Saldo Atual: R$ <span id="saldoAtual" style="font-size: 1.2em;">0,00</span></strong></p>
    </div>
</div>

<div id="transacoes" class="page hidden">
    <h2>Transações</h2>
    
    <div class="card">
        <h3>Adicionar Nova Transação</h3>
        <input type="text" id="tDescricao" placeholder="Descrição (Ex: Pizza no Fim de Semana)">
        <input type="number" id="tValor" placeholder="Valor (Ex: 50.50)">
        <input type="date" id="tData">
        
        <select id="tTipo">
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
        </select>

        <select id="tCategoria">
            </select>

        <select id="tCartao">
            </select>
        
        <button onclick="addTransacao()">Salvar Transação</button>
    </div>

    <div class="card">
        <h3>Lista de Lançamentos</h3>
        <div id="listaTransacoes">
            </div>
    </div>
</div>

<div id="cadastro" class="page hidden">
    <h2>Cadastros</h2>

    <div class="card">
        <h3>Gerenciar Categorias</h3>
        <input type="text" id="catNome" placeholder="Nova Categoria (Ex: Pet)">
        <button onclick="addCategoria()">Adicionar Categoria</button>
        <div id="listaCategorias" style="margin-top: 10px;">
            </div>
    </div>

    <div class="card">
        <h3>Cartões de Crédito</h3>
        <input type="text" id="cNome" placeholder="Nome (Ex: Nubank)">
        <select id="cBandeira">
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="Elo">Elo</option>
            <option value="Outra">Outra</option>
        </select>
        <small>Dia de fechamento da fatura (o dia que as compras param de entrar na fatura atual):</small>
        <input type="number" id="cFechamento" placeholder="Ex: 25 (dia 25)">
        <small>Dia de vencimento da fatura:</small>
        <input type="number" id="cVencimento" placeholder="Ex: 5 (dia 5)">
        <button onclick="addCartao()">Adicionar Cartão</button>
        <div id="listaCartoes" style="margin-top: 10px;">
            </div>
    </div>
</div>

<div id="config" class="page hidden">
    <h2>Configurações e Dados</h2>

    <div class="card">
        <h3>Importar do Google Sheets</h3>
        <p>A planilha deve ter as colunas na seguinte ordem: **ID | Tipo | Categoria | Valor | Data | Descrição**.</p>
        <input type="url" id="sheetURL" placeholder="URL da Planilha (Ex: https://docs.google.com/spreadsheets/d/...)">
        <button onclick="importarSheets()">Importar e Sobrescrever Dados</button>
    </div>

    <div class="card">
        <h3>Exportar Dados</h3>
        <p>Exporta todas as transações atuais para um arquivo TSV (separado por tabulação), compatível com a maioria dos editores de planilha.</p>
        <button onclick="exportarTSV()">Exportar Transações</button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
/* ============================================================
   DADOS DO APP
============================================================ */
// Carrega os dados do localStorage ou inicia com valores padrão
let categorias = JSON.parse(localStorage.getItem("categorias") || `[
    "Alimentação","Transporte","Moradia","Saúde","Educação","Lazer","Outros"
]`);

let cartoes = JSON.parse(localStorage.getItem("cartoes") || "[]");
let transacoes = JSON.parse(localStorage.getItem("transacoes") || "[]");

/* ============================================================
   SALVAR DADOS
============================================================ */
function salvar() {
    localStorage.setItem("categorias", JSON.stringify(categorias));
    localStorage.setItem("cartoes", JSON.stringify(cartoes));
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

/* ============================================================
   NAVEGAÇÃO ENTRE TELAS
============================================================ */
function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");

    // Re-renderizar o resumo ao entrar no Dashboard
    if (page === 'dashboard') {
        renderResumo();
    }
}

/* ============================================================
   CATEGORIAS
============================================================ */
function renderCategorias() {
    // Para o SELECT de Transações
    document.getElementById("tCategoria").innerHTML =
        categorias.map(c => `<option>${c}</option>`).join("");

    // Para a lista de gerenciamento
    document.getElementById("listaCategorias").innerHTML =
        categorias.map((c, i) => `
            <div class="list-item flex">
                <span>${c}</span>
                <button class="danger" onclick="delCategoria(${i})" style="width: auto; margin: 0;">❌</button>
            </div>
        `).join("");
}

function addCategoria() {
    let nome = document.getElementById("catNome").value.trim();
    if (!nome) return alert("Digite o nome da categoria");
    categorias.push(nome);
    salvar();
    renderCategorias();
    document.getElementById("catNome").value = ''; // Limpa o campo
}

function delCategoria(i) {
    if (confirm("Excluir categoria? Todas as transações com ela serão mantidas com o nome, mas a opção de cadastro some.")) {
        categorias.splice(i,1);
        salvar();
        renderCategorias();
    }
}

/* ============================================================
   CARTÕES
============================================================ */
function renderCartoes() {
    // Para o SELECT de Transações
    document.getElementById("tCartao").innerHTML =
        `<option value="">Nenhum</option>` +
        cartoes.map(c => `<option value="${c.id}">${c.nome}</option>`).join("");

    // Para a lista de gerenciamento
    document.getElementById("listaCartoes").innerHTML =
        cartoes.map(c => `
            <div class="list-item flex">
                <div>
                    <strong>${c.nome}</strong><br>
                    <small>${c.bandeira} | Fecha dia ${c.fechamento} | Vence dia ${c.vencimento}</small>
                </div>
                <button class="danger" onclick="delCartao('${c.id}')" style="width: auto; margin: 0;">🗑</button>
            </div>
        `).join("");
}

function addCartao() {
    let nome = cNome.value.trim();
    if (!nome) return alert("Digite o nome do cartão");
    if (!cFechamento.value || !cVencimento.value) return alert("Preencha as datas");

    cartoes.push({
        id: Date.now(),
        nome,
        bandeira: cBandeira.value,
        fechamento: parseInt(cFechamento.value),
        vencimento: parseInt(cVencimento.value)
    });

    salvar();
    renderCartoes();
    cNome.value = ''; // Limpa campos
    cFechamento.value = '';
    cVencimento.value = '';
}

function delCartao(id) {
    if (confirm("Excluir cartão?")) {
        cartoes = cartoes.filter(c => c.id != id);
        salvar();
        renderCartoes();
    }
}

/* ============================================================
   TRANSAÇÕES
============================================================ */
function renderTransacoes() {
    // Ordena as transações pela data (mais recente primeiro)
    const transacoesOrdenadas = [...transacoes].sort((a, b) => new Date(b.data) - new Date(a.data));

    listaTransacoes.innerHTML = transacoesOrdenadas.map(t => `
        <div class="list-item flex">
            <div>
                <strong>${t.descricao}</strong><br>
                <small>${t.tipo === "despesa" ? "💸 Despesa" : "💰 Receita"} • ${t.categoria} • ${t.data}</small><br>
                ${t.cartao ? `<small>💳 Cartão: ${getCartaoNome(t.cartao)}</small>` : ""}
            </div>
            <div style="text-align: right;">
                <strong style="color: ${t.tipo === "despesa" ? "#da3633" : "#238636"}">
                    ${t.tipo === "despesa" ? "- " : "+ "} R$ ${parseFloat(t.valor).toFixed(2).replace('.', ',')}
                </strong>
                <button class="danger" onclick="delTransacao(${t.id})" style="width: auto; margin-top: 4px; padding: 4px;">X</button>
            </div>
        </div>
    `).join("");
}

function getCartaoNome(id) {
    let c = cartoes.find(x => x.id == id);
    return c ? c.nome : "";
}

function addTransacao() {
    let descricao = tDescricao.value.trim();
    let valor = tValor.value;
    let categoria = tCategoria.value;
    let tipo = tTipo.value;
    let data = tData.value;
    let cartao = tCartao.value || null;

    if (!descricao || !valor || !data) return alert("Preencha todos os campos");

    transacoes.push({
        id: Date.now(),
        descricao,
        valor: parseFloat(valor).toFixed(2),
        categoria,
        tipo,
        data,
        cartao
    });

    salvar();
    renderTransacoes();
    renderResumo();

    // Limpa os campos após adicionar
    tDescricao.value = '';
    tValor.value = '';
    tData.value = '';
}

function delTransacao(id) {
    if (confirm("Excluir esta transação?")) {
        // ID do localStorage é um número, mas pode vir como string do Google Sheets
        transacoes = transacoes.filter(t => t.id != id); 
        salvar();
        renderTransacoes();
        renderResumo();
    }
}

/* ============================================================
   RESUMO + GRÁFICO
============================================================ */
let pizzaChart; // Variável para armazenar a instância do gráfico

function renderResumo() {
    let despesas = {};
    let receitasTotal = 0;
    let despesasTotal = 0;

    transacoes.forEach(t => {
        let valor = parseFloat(t.valor);
        if (t.tipo === "despesa") {
            despesas[t.categoria] = (despesas[t.categoria] || 0) + valor;
            despesasTotal += valor;
        } else {
            receitasTotal += valor;
        }
    });

    // 1. Atualiza os valores do resumo
    let saldoAtual = receitasTotal - despesasTotal;
    
    document.getElementById("totalReceitas").textContent = receitasTotal.toFixed(2).replace('.', ',');
    document.getElementById("totalDespesas").textContent = despesasTotal.toFixed(2).replace('.', ',');
    document.getElementById("saldoAtual").textContent = saldoAtual.toFixed(2).replace('.', ',');
    document.getElementById("saldoAtual").style.color = saldoAtual >= 0 ? '#238636' : '#da3633';

    // 2. Renderiza o gráfico de pizza das despesas
    let ctx = document.getElementById("pizza").getContext("2d");

    if (pizzaChart) pizzaChart.destroy(); // Destrói a instância anterior

    const cores = [
        '#da3633', // Vermelho - Alimentação/Despesas
        '#bf8700', // Laranja - Transporte
        '#58a6ff', // Azul claro - Moradia
        '#8b949e', // Cinza - Saúde
        '#56d364', // Verde - Educação
        '#f0a359', // Amarelo - Lazer
        '#6e7681', // Cinza escuro - Outros
        '#4f42b5', // Roxo
        '#9b4e4e' // Marrom
    ];
    
    window.pizzaChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(despesas),
            datasets: [{
                data: Object.values(despesas),
                backgroundColor: Object.keys(despesas).map((_, i) => cores[i % cores.length]),
                borderWidth: 1,
                borderColor: '#0d1117'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#e6edf3' // Cor do texto da legenda
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += 'R$ ' + context.parsed.toFixed(2).replace('.', ',');
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

/* ============================================================
   GOOGLE SHEETS (IMPORTAÇÃO)
============================================================ */
async function importarSheets() {
    let url = sheetURL.value;

    if (!url.includes("docs.google.com/spreadsheets")) return alert("URL do Google Sheets inválida. Use a URL completa da planilha.");

    let sheetIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!sheetIdMatch) return alert("Não foi possível extrair a ID da planilha da URL.");
    
    const sheetId = sheetIdMatch[1];
    // Exporta como JSON (gviz/tq) para o gid=0 (primeira planilha)
    const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=0`;

    try {
        let res = await fetch(exportUrl);
        let text = await res.text();
        
        // Remove o prefixo JSONP
        const jsonString = text.substring(47).slice(0, -2);
        const json = JSON.parse(jsonString);

        const novasTransacoes = json.table.rows.map(r => {
            // O acesso a r.c[i] pode ser nulo se a célula estiver vazia.
            const dataStr = r.c[4]?.v; 
            let dataFormatada = r.c[4]?.v;
            
            // Tenta formatar a data do Sheets (Date(YYYY, M, D)) para YYYY-MM-DD
            const dateMatch = dataStr ? dataStr.match(/Date\((\d+),\s*(\d+),\s*(\d+)\)/) : null;
            if (dateMatch) {
                // O mês do JS/Sheets é 0-baseado (Janeiro é 0). 
                // A função Date(ano, mes, dia) do Sheets já vem com o mês correto para o construtor Date.
                // Mas a regex precisa ajustar para o Date.toISOString() funcionar bem.
                const ano = parseInt(dateMatch[1]);
                const mes = parseInt(dateMatch[2]); // Já está 0-based
                const dia = parseInt(dateMatch[3]);
                dataFormatada = new Date(ano, mes, dia).toISOString().split("T")[0]; 
            }

            return {
                id: r.c[0]?.v || Date.now(), // ID
                tipo: r.c[1]?.v ? r.c[1].v.toLowerCase().trim() : 'despesa', // Tipo (Garantir lowercase)
                categoria: r.c[2]?.v || 'Outros', // Categoria
                valor: parseFloat(r.c[3]?.v || 0).toFixed(2), // Valor
                data: dataFormatada, // Data formatada
                descricao: r.c[5]?.v || 'Sem descrição', // Descrição
                cartao: null // Não importamos cartão do sheets
            };
        });
        
        // Substitui todas as transações
        transacoes = novasTransacoes; 
        salvar();
        renderTransacoes();
        renderResumo();

        alert(`Importado com sucesso! ${novasTransacoes.length} transações carregadas.`);
    } catch (e) {
        console.error("Erro na importação:", e);
        alert("Erro ao importar. Verifique se a URL está correta, se a planilha está pública e se a ordem das colunas está correta.");
    }
}

/* ============================================================
   EXPORTAR TSV
============================================================ */
function exportarTSV() {
    // Cabeçalho para identificar as colunas na planilha
    let cabecalho = "ID\tTipo\tCategoria\tValor\tData\tDescricao\tCartaoID\n";
    
    let texto = transacoes.map(t =>
        `${t.id}\t${t.tipo}\t${t.categoria}\t${t.valor}\t${t.data}\t${t.descricao}\t${t.cartao || ""}`
    ).join("\n");

    let blob = new Blob([cabecalho + texto], { type: "text/tsv;charset=utf-8" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "transacoes.tsv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ============================================================
   INICIALIZAÇÃO
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todos os dados e interfaces
    renderCategorias();
    renderCartoes();
    renderTransacoes();
    // Exibe o dashboard e renderiza o resumo/gráfico na inicialização
    showPage('dashboard'); 
});

</script>

<script>
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
</script>

</body>
</html>
