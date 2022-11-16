import Model from "../model/model.js";

class ConfirmationCtrl {
    model = new Model();

    getOrderData (){
        var params = (new URL(document.location)).searchParams;
        if(params.has('orderId')) {
            const orderId = params.get('orderId');
            const spanOrderId = document.querySelector("#orderId");
            spanOrderId.textContent = orderId;
        }
    }

    deleteOrderData (){
        localStorage.clear();
    }
}

let confirmation = new ConfirmationCtrl();

confirmation.getOrderData();
confirmation.deleteOrderData();
//1_récupérer l'id via url (cf productctrl)
//insérer id dans html
//vider le panier (localstorage.remove)
//2_finaliser plan de test
//3_commenter code et test global