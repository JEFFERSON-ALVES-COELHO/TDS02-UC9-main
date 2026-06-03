const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
 
async function buscarDetalhes() {
    try {
        const response = await fetch(`${API_BASE_URL}/fornecedores/${id}`);
 
        if (!response.ok) {
            throw new Error("Erro ao carregar fornecedor");
        }
 
        const fornecedor = await response.json();
 
        document.getElementById("dados-fornecedor").innerHTML = `
            <h3>${fornecedor.nome}</h3>
            <p><strong>CNPJ:</strong> ${fornecedor.cnpj}</p>
            <p><strong>Nome Fantasia:</strong> ${fornecedor.nomeFantasia}</p>
        `;
 
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
 
        document.getElementById("dados-fornecedor").innerHTML =
            `<p>Erro ao carregar dados do fornecedor.</p>`;
    }
}
 
document.getElementById("btn-excluir").addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/fornecedores/${id}`, {
            method: 'DELETE'
        });
 
        if (!response.ok) {
            throw new Error("Erro ao excluir fornecedor!");
        }
 
        alert("Fornecedor excluído com sucesso!");
        window.location.href = 'index.html';
 
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o fornecedor. Tente novamente.");
    }
});
 
buscarDetalhes();