function getElementId(id) {
    return document.getElementById(id)
}

class Player {
    constructor(name) {
        this.name = name;
        this.point = 0;
    }
}

class PlayerList {
    constructor() {
        this.list = [];
    }

    updateList() {
        let name = $("#name").val().toUpperCase();
        switch (name) {
            case "DUNG":
                name = "DŨNG NGHIỆN";
                break;
            case "QUY":
                name = "QUÝ NÁT";
                break;
            case "VIET":
                name = "VIỆT CỘNG";
                break;
        }
        let player = new Player(name);
        this.list.push(player);
        this.showList();
    }

    showList() {
        $("#table-body").html("");
        this.list.forEach((player, index) => {
            $("#table-body").append(`<tr>
                <td>${++index}</td>
                <td>${player.name}</td>
                <td>${player.point}</td>
                <td><button type="button" onclick="playerList.showListPlusPoint(${--index})" id="open-point-modal" class="btn btn-success" data-toggle="modal" data-id="${index}" data-name="${player.name}" data-target="#pointModal"><i class="fas fa-plus"></i></button></td>
                <td><button type="button" onclick="playerList.superUpdatePoint(${index})" id="super-button" class="btn btn-danger" data-id="${index}"><i class="fas fa-plus"></i></button></td>
                </tr>`);
        });
    }

    showListPlusPoint(index) {
        $("#point-table").html("");
        for (let i = 0; i < this.list.length; i++) {
            if (i !== index) {
                $("#point-table").append(`<tr>
                    <td>${this.list[i].name}</td>
                    <td><input id="player-${i}" type="number" size="1"></td>
                    </tr>`);
            }
        }
    }

    updatePoint() {
        let index = parseInt($("#hidden").val());
        for (let i = 0; i < this.list.length; i++) {
            if (i !== index) {
                let point = ($("#player-" + i).val()) ? parseInt($("#player-" + i).val()) : 0;
                this.list[i].point -= point;
                this.list[index].point += point;
            }
        }
        $('#pointModal').modal('hide');
        this.showList();
    }

    superUpdatePoint(index) {
        for (let i = 0; i < this.list.length; i++) {
            if (i !== index) {
                this.list[i].point -= 20;
            }
        }
        this.list[index].point += 60;
        this.showList();
    }
}

let playerList = new PlayerList();
$("#save-button").on('click', function () {

});
$('#playerModal').on('shown.bs.modal', function () {
    $('#name').trigger('focus');
});

$('#save-name').on('click', function () {
    $('#name').val("");
    $('#playerModal').modal('hide');
});

$(document).on('click', "#open-point-modal", function () {
    let name = $(this).data('name');
    $("#player-name").html(name);
    let point = $(this).data('id');
    $("#hidden").val(point);
});