const DEFAULT_INDEX = -1;

class Player {
    constructor(name) {
        this.name = name;
        this.point = 0;
    }
}

class PlayerList {
    constructor() {
        this.list = [];
        this.currentIndex = DEFAULT_INDEX;
    }

    updateList() {
        let name = $("#name").val().toUpperCase();
        switch (name) {
            case "DUNG":
                name = "DŨNG";
                break;
            case "QUY":
                name = "QUÝ";
                break;
            case "VIET":
                name = "VIỆT";
                break;
            case "NHAN":
                name = "NHẪN"
        }
        if (this.currentIndex === DEFAULT_INDEX) {
            let player = new Player(name);
            this.list.push(player);
        } else {
            this.list[this.currentIndex].name = name;
            $('#save-name').val('Create');
            this.currentIndex = DEFAULT_INDEX;
        }
        this.setStorage();
        this.showList();
    }

    showList() {
        $("#table-body").html("");
        this.list.forEach((player, index) => {
            $("#table-body").append(`<tr>
                <td class="player-name" onclick="playerList.editPlayer(${index})">${player.name}</td>
                <td class="text-center">${player.point}</td>
                <td><button type="button" onclick="playerList.showListPlusPoint(${index})" id="open-point-modal" class="btn btn-success" data-toggle="modal" data-id="${index}" data-name="${player.name}" data-target="#pointModal"><i class="fas fa-plus"></i></button></td>
                <td><button style="background-color: mediumvioletred; color: white" type="button" onclick="playerList.superUpdatePoint(${index})" id="super-button" class="btn" data-id="${index}"><i class="fas fa-plus"></i></button></td>
                </tr>`);
        });
    }

    showListPlusPoint(index) {
        $("#point-table").html("");
        for (let i = 0; i < this.list.length; i++) {
            if (i !== index) {
                $("#point-table").append(`<tr>
                    <td>${this.list[i].name}</td>
                    <td><input class="col-xs-111" id="player-${i}" type="number" size="1"></td>
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
        this.setStorage();
        this.showList();
    }

    superUpdatePoint(index) {
        for (let i = 0; i < this.list.length; i++) {
            if (i !== index) {
                this.list[i].point -= 20;
                this.list[index].point += 20;
            }
        }
        this.setStorage();
        this.showList();
    }

    setStorage() {
        let jsonList = JSON.stringify(this.list);
        localStorage.setItem('Players', jsonList);
    }

    getStorage() {
        if (localStorage.length > 0) {
            let jsonList = localStorage.getItem('Players');
            this.list = JSON.parse(jsonList);
            this.showList();
        }
    }

    clearStorage() {
        localStorage.clear();
        this.list = [];
        this.showList();
    }

    resetPoint() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].point = 0;
        }
        this.setStorage();
        this.showList();
    }

    editPlayer(index) {
        this.currentIndex = index;
        $('#playerModal').modal('show');
        let name = this.list[index].name;
        $('#name').val(name);
        $('#save-name').val('Save');
    }
}

let playerList = new PlayerList();

$('#playerModal').on('shown.bs.modal', function () {
    $('#name').trigger('focus');
});

$('#playerModal').on('hidden.bs.modal', function () {
    $(this).find('input[type=text]').val('').end();
    $('#save-name').val('Create');
    playerList.currentIndex = DEFAULT_INDEX;
});

$('#save-name').on('click', function () {
    $('#name').val("");
    $('#playerModal').modal('hide');
});

$(document).on('click', "#open-point-modal", function () {
    let name = $(this).data('name');
    $("#player-name").html(name);
    let id = $(this).data('id');
    $("#hidden").val(id);
});
