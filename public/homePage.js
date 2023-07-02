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

setTimeout(function() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}, 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        try {
            if(response.success) {
            ProfileWidget.showProfile(response.data);
        }
        } catch (error) {
            moneyManager.setMessage();
        }
        location.reload();
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        try {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
            }
        } catch (error) {
            moneyManager.setMessage();
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        try {
            if(response.success) {
                ProfileWidget.showProfile(response.data);
            }
        } catch (error) {
            moneyManager.setMessage();
        }
    })
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
        try {
            if(response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                moneyManager.updateUsersList(response.data);
            }
        } catch (error1) {
            moneyManager.setMessage();
        }
    });
}

favoritesWidget.addUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        try {
            if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            }
        } catch (error1) {
            moneyManager.setMessage();
        }
    });
}

