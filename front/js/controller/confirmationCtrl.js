import Model from "../model/model.js";

class ConfirmationCtrl {
    
    model = new Model();

    getOrderData (){
        var params = (new URL(document.location)).searchParams;
        if (params.has('orderId')) {
            const orderId = params.get('orderId');
            const spanOrderId = document.querySelector("#orderId");
            spanOrderId.textContent = orderId;
            this.deleteOrderData();
        }
    }

    deleteOrderData (){
        localStorage.clear();
    }
}

let confirmation = new ConfirmationCtrl();
confirmation.getOrderData();