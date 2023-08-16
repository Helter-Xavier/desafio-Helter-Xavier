class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        }

        this.itemExtra = {
            chantily: "cafe",
            queijo: "sanduiche"
        }
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const formasPagamento = ["dinheiro", "debito", "credito"];
        // Verificar a forma de pagamento 
        if (!formasPagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        // Verificar itens no carrinho
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        //Variável pra armazenar o pedido
        let pedidoTotal = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            //Verifica se o item é válido
            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }
            //Verifica a quantidade de itens
            if (Number(quantidade) === 0) {
                return "Quantidade inválida!"
            }
            //Verifica itens extras
            if (this.itemExtra[codigo] && !itens.some(i => i.startsWith(this.itemExtra[codigo]))) {
                return "Item extra não pode ser pedido sem o principal";
            }

            //Calculo de preço dos itens
            pedidoTotal += this.cardapio[codigo] * Number(quantidade)
        }

        //Verificação formaDePagamento
        if (formaDePagamento === "dinheiro") {
            pedidoTotal *= 0.95; // 5% de desconto
        } else if (formaDePagamento === "credito") {
            pedidoTotal *= 1.03; // 3% de acréscimo
        }

        //Retorna o preço  do pedido
        return `R$ ${pedidoTotal.toFixed(2).replace('.', ',')}`;
    }
}

export {
    CaixaDaLanchonete
};