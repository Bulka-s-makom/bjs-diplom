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
            moneyManager.setMessage(false, response.error);
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
                moneyManager.setMessage(true, "Конвертация прошла успешно");
            } else
            moneyManager.setMessage(false, response.error);
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
                moneyManager.setMessage(true, "Перевод выполнен");
            } else
            moneyManager.setMessage(false, response.error);
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

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
            if(response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                favoritesWidget.updateUsersList(response.data);
                favoritesWidget.setMessage(true, "Контакт добавлен");
            } else
            favoritesWidget.setMessage(false, response.error);
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
            if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Контакт удален");
            } else
            favoritesWidget.setMessage(false, response.error);
    });
}

