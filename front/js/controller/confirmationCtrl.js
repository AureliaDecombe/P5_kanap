class ConfirmationCtrl {

    /**
     * Confirme la commande :
     * Rècupère l'orderId donnnée par le back et l'affiche à l'utilisateur ;
     * Appelle la méthode suivante.
     */
    confirmOrder (){
        var params = (new URL(document.location)).searchParams;
        if (params.has('orderId')) {
            const orderId = params.get('orderId');
            const spanOrderId = document.querySelector("#orderId");
            spanOrderId.textContent = orderId;
            this.deleteOrderData();
        }
    }

    /**
     * Vide le panier.
     */
    deleteOrderData (){
        localStorage.clear();
    }
}

let confirmation = new ConfirmationCtrl();
confirmation.confirmOrder();