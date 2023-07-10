//выход из личного кабинета//
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        console.log(response);
        if(response.success) {
            location.reload();
        }
    });
}

//получение информации о пользователе
ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//получение текущих курсов валют
const ratesBoard = new RatesBoard();

let timerCurrency = function() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

timerCurrency();

setTimeout(timerCurrency(), 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
            if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс пополнен");
            } else
            moneyManager.setMessage(false, response);
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
                moneyManager.setMessage(true, "Баланс пополнен");
            } else
            moneyManager.setMessage(false, response);
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
                moneyManager.setMessage(true, "Баланс пополнен");
            } else
            moneyManager.setMessage(false, response);
    });
}

// работа с избранным
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
});

favoritesWidget.removeUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
            if(response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
                moneyManager.setMessage(true, "Баланс пополнен");
            } else
            moneyManager.setMessage(false, response);
    });
}

favoritesWidget.addUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
            if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, "Баланс пополнен");
            } else
            moneyManager.setMessage(false, response);
    });
}

