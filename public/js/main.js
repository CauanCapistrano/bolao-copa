async function getItens() {
    let req = await fetch("/palpites");
    return (await req).json();
}

async function addAttItem() {
    if (!$("#idPalpites").val()) {
        await fetch("/palpites",{
            method  : "POST",
            headers : {"Content-Type": "application/json"},
            body    : JSON.stringify({
                                        palpitea : {pais : $("#pais1").val(), palpite : $("#palpite1").val()},
                                        palpiteb : {pais : $("#pais2").val(), palpite : $("#palpite2").val()}, 
                                        participante: $("#nome").val()
                                    }) 
        });
    } else {
        await fetch(`/palpites/${$("#idPalpites").val()}`,{
            method  : "PUT",
            headers : {"Content-Type": "application/json"},
            body    : JSON.stringify({
                                        palpitea : {pais : $("#pais1").val(), palpite : $("#palpite1").val()},
                                        palpiteb : {pais : $("#pais2").val(), palpite : $("#palpite2").val()}, 
                                        participante: $("#nome").val()
                                    }) 
        });   
    }
    attItensLista();
    $("#pais1").val('');
    $("#pais2").val('');
    $("#palpite1").val('');
    $("#palpite2").val('');
    $("#nome").val('');
    $("#idPalpites").val('');
}

async function deleteItens(id) {
    await fetch(`/palpites/${id}`,{
        method  : "DELETE"
    });

    attItensLista();
}

async function attItensLista() {
    const itens = await getItens();
    $("#bodyPalpites").html('');
    const tbody = $("#bodyPalpites");
    itens.forEach(item => {
        let trGeral = $("<tr>");
        let tdPalpite  = $("<td>").html(`${item.palpitea.pais} ${item.palpitea.palpite} X ${item.palpiteb.palpite} ${item.palpiteb.pais} `);
        let tdParticipante  = $("<td>").html(item.participante);

        let buttonAlterar = $("<button>")
        .html("Alterar")
        .click(() => {    
            $("#pais1").val(item.palpitea.pais);
            $("#pais2").val(item.palpiteb.pais);
            $("#palpite1").val(item.palpitea.palpite);
            $("#palpite2").val(item.palpiteb.palpite);
            $("#nome").val(item.participante);
            $("#idPalpites").val(item.id);
        });

        let buttonExcluir = $("<button>")
        .html("Excluir")
        .click(() => deleteItens(item.id));

        let tdButtons = $("<td>").addClass("text-center").append(buttonAlterar,buttonExcluir);
        trGeral.append(tdParticipante,tdPalpite,tdButtons);
        tbody.append(trGeral);
    });
}

//Atualiza a lista ao entrar na pagina 
attItensLista();