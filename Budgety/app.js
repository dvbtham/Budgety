//BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome) * 100);
        else this.percentage = -1;
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }
    var InCome = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });

        data.totals[type] = sum;
    };

    return {
        addNewItem: function (type, description, value) {
            var newItem, Id;

            if (data.allItems[type].length > 0) {
                Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else Id = 0;

            if (type === "exp") {
                newItem = new Expense(Id, description, value);
            }
            else if (type === "inc") {
                newItem = new Expense(Id, description, value);
            }

            data.allItems[type].push(newItem);

            return newItem;
        },
        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);
            if (index === -1) return;
            data.allItems[type].splice(index, 1);
        },
        caculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else
                data.percentage = -1;
        },
        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: () => console.log(data)
    }

})();

// UI CONTROLLER
var UIController = (function () {
    var DOMStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeList: ".income__list",
        expenselist: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentage: ".budget__expenses--percentage",
        container: ".container",
        expensesPercentageLabel: ".item__percentage",
        monthLabel: ".budget__title--month"
    }

    var formatNumber = function (num, type) {
        var numSplit, int, dec, type;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split(".");
        int = numSplit[0];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;

            if (type === "inc") {
                element = DOMStrings.incomeList;
                html = ` <div class="item clearfix" id="inc-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }
            else if (type === "exp") {
                element = DOMStrings.expenselist;
                html = `
                        <div class="item clearfix" id="exp-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }

            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        },
        removeItem: function (itemId) {
            // var el = document.getElementById(itemId).parentNode;
            // el.parentNode.removeChild(el);

            //console.log(itemId);

            document.getElementById(itemId).remove();
        },
        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
            var nodeListForeach = function (list, callback) {
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForeach(fields, function (current, index) {
                if (percentages[index] > 0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '---';
            });
        },
        getDOMStrings: () => DOMStrings,
        displayBudget: function (obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, type);
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, type);
            if (obj.percentage > 0)
                document.querySelector(DOMStrings.percentage).textContent = obj.percentage + '%';
            else
                document.querySelector(DOMStrings.percentage).textContent = '---';
        },
        changedType: function () {
            var fields = document.querySelectorAll(
                DOMStrings.inputValue + ',' +
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription);

            var nodeListForeach = function (list, callback) {
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForeach(fields, function (curr) {
                curr.classList.toggle("red-focus");
            });
            document.querySelector(DOMStrings.inputBtn).classList.toggle("red");
        },
        displayMonth: function () {
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            month = now.getMonth();
            document.querySelector(DOMStrings.monthLabel).textContent = months[month] + ' ' + year;
        },
        clearFields: function () {
            var fields, fieldArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldArr = Array.prototype.slice.call(fields);

            fieldArr.forEach(element => {
                element.value = "";
            });
            fieldArr[0].focus();
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var updateBudget = function () {
        budgetCtrl.caculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        budgetCtrl.calculatePercentages();

        var percentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function () {
        var input, newItem;
        input = UICtrl.getInput();

        if (input.description === "" || isNaN(input.value)) return;

        newItem = budgetCtrl.addNewItem(input.type, input.description, input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
        updateBudget();
        updatePercentages();
    };

    var changedType = function () {
        UICtrl.changedType();
    };

    var ctrlDeleteItem = function (event) {
        var splitId, type, elementId, Id;
        elementId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        splitId = elementId.split("-");
        type = splitId[0];
        Id = splitId[1];

        budgetCtrl.deleteItem(type, parseInt(Id));
        UICtrl.removeItem(elementId);
        updateBudget();
        updatePercentages();
    };

    var setUpEventListener = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener("change", changedType);
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    return {
        init: function () {
            UICtrl.displayMonth();
            setUpEventListener();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIController);

controller.init();