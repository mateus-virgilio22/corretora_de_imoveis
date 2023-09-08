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
            .replace(/\${dimensao}/g, e.dimensao)
            .replace(/\${comodos}/g, e.comodos)
            .replace(/\${bairro}/g, e.bairro)

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

    },
}

imoveis.templates = {

    item: 

    `
        <div class="card" style="width: 9rem; height: 13rem;" onclick="imoveis.metodos.abrirModal()">
            <img class="img_imoveis" src="\${img}" alt="">
            <div class="card-body">
                <p class="card-text comodos">\${comodos}</p>
                <p class="card-text dimensao">\${dimensao}</p>
                <p class="card-text bairro">\${bairro}</p>
            </div>
        </div>
    `,

    album:
    `
    <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="./img/amostra_1.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./img/amostra_2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./img/amostra_4.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./img/amostra_4.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="./img/amostra_4.jpg" class="d-block w-100" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
    
    `
}