$(document).ready(function(){
    imoveis.eventos.init();
})

var imoveis = {};

imoveis.eventos = {

    init: () => {
        imoveis.metodos.obterItensImoveis();
    }

}

imoveis.metodos = {
    obterItensImoveis: (categoria = 'nova_russas', vermais = false) => {

        var filtro = IMOVEL[categoria];
        console.log(filtro);

        if(!vermais) {
            $("#itensImoveis").html('');
            $("#btnVerMais").removeClass('hidden');
        }


        $.each(filtro, (i, e) => {

            let temp = imoveis.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${nome}/g, e.name)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, e.id)

            // botão ver mais foi clicado (12 itens)
            if(vermais && i >= 8 && i < 12) {
                $("#itensImoveis").append(temp)
            }

            // paginação inicial (8 itens)
            if(!vermais && i < 8) {
                $("#itensImoveis").append(temp)
            }
            
        })

        // remove o ativo
        $(".content-imoveis a").removeClass('active');

        // seta o menu para ativo
        $("#imoveis-" + categoria).addClass('active');

    },

    // clique no botão de ver mais
    verMais: () => {

        var ativo = $(".content-imoveis a.active").attr('id').split('imoveis-')[1];
        imoveis.metodos.obterItensImoveis(ativo, true);

        $("#btnVerMais").addClass('hidden');

    }
}

imoveis.templates = {

    item: 

    `
        <div class="card" style="width: 9rem; height: 15rem;">
            <img src="\${img}" alt="">
            <div class="card-body">
                <p class="card-text">120m x 20m</p>
                <p class="card-text">R$ \${preco}</p>
                <p class="card-text">250x de R$ 2.000,00</p>
            </div>
        </div>
    `
}