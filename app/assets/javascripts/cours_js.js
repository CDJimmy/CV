
function log(d) {
    'use strict';
    window.console.log(d);
}

function select(css) {
    'use strict';
    return document.querySelector(css);
}

function selectAll(css) {
    'use strict';
    return document.querySelectorAll(css);
}

function getCSS(div, property) {
    'use strict';
    return window.getComputedStyle(div, null).getPropertyValue(property);
}

var doFrancis = (function f() {
    'use strict';
    var methode1,
        methode2,
        methode3,
        clearForm,
        addAndUpdateUser,
        inputValid,
        transfertUser,
        createDivListener,
        deleteUser,
        dragDiv,
        dragStartUser,
        dragEndUser,
        dragEnterUser,
        dragLeaveUser,
        dragOverUser,
        dropUser,
        removeDivListener,
        observe;
    
    methode1 = function () {
        var xhr;
        
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/request');
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send('val=' + null);
    };
    
    methode2 = function () {
        var xhr, fd;
        fd = new window.FormData();
        fd.append('val', 'null');
        fd.append('val2', 'daf');
        
        
        xhr = new XMLHttpRequest();
        xhr.open('POST', '/request');
        xhr.send(fd);
    };
    
    //when form submit, check if info is corect, and post user dynamicly
    addAndUpdateUser = function () {
        var user, isOk, indexOrder, xhr, fd, item, target;
        user = {};
        fd = new window.FormData();
        isOk = true;
        user.id = select('#id').value;
        
        isOk = inputValid(select('input[name="civility"]:checked'), isOk, /[a-zA-Z0-9 .\-_*àèìòùÀÈáéíóúýÁÉâêîôûãñõäëïöüç]*/g);
        if (isOk) {
            user.civility = select('input[name="civility"]:checked').value;
        }
        
        isOk = inputValid(user.firstName = select('#first-name'), isOk, /[a-zA-Z_\- àèìòùÀÈáéíóúýÁÉâêîôûãñõäëïöüç]{3,50}/g);
        user.firstName = select('#first-name').value;
        
        isOk = inputValid(select('#last-name'), isOk, /[a-zA-Z_\- ]{3,50}/g);
        user.lastName = select('#last-name').value;
        
        isOk = inputValid(select('#age'), isOk, /(1[8-9])|([2-9][0-9])|(1[0-2][0-9])/g);
        user.age = select('#age').value;
        
        isOk = inputValid(select('#email'), isOk, /([a-z0-9_.\-]+)@([da-z.\-]+)\.([a-z.]{2,6})/g);
        user.email = select('#email').value;
        
        isOk = inputValid(select('#color-background'), isOk, /#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g);
        user.colorBackground = select('#color-background').value;
        
        isOk = inputValid(select('#color-title'), isOk, /#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g);
        user.colorTitle = select('#color-title').value;
        
        if (isOk) {
            fd.append('user', JSON.stringify(user));
            
            xhr = new XMLHttpRequest();
            xhr.open('POST', '/request');
            xhr.send(fd);
            xhr.onreadystatechange = function (response) {
                //if user.save/update is ok
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var divNewUser, divLastUser, divUsers, userId, wrapper, users, i, links;
                    target = response.target || response.srcElement;
                    //get partial user complete by rails controller with user ( in html text)
                    divNewUser = target.response;
                    divUsers = select('#users');
                    
                    userId = /id="user-([0-9]+)"/.exec(divNewUser);
                    if (userId !== null) {
                        userId = userId[1];
                        divLastUser = select('#user-' + userId);
                        //if existing user updated
                        if (divLastUser) {
                            //add new div before last div whitch delete
                            divLastUser.insertAdjacentHTML('afterend', divNewUser);
                            divNewUser = divLastUser.nextElementSibling;
                            divUsers.removeChild(divLastUser);
                        //if new user
                        } else {
                            user.id = userId;
                            divUsers.innerHTML += divNewUser;
                            divNewUser = divUsers.lastChild;
                        }
                        users = select('#users').children;
                        for (i = 0; i < users.length; i += 1) {
                            createDivListener(users[i]);
                        }
                        clearForm();
                    }
                }
                //if new user with existing mail
                //if (xhr.readyState === 4 && xhr.status === 422) {
                //    log(response.target.response);
                //}
            };
        }
    };

    //check if value is ok
    inputValid = function (inp, isOk, expression) {
        var result;
        if (inp === undefined || inp === null || inp.value === '') {return false; }
        if (!(inp.value).match(expression)) {
            return false;
        }
        return isOk;
    };
     
    transfertUser = function () {
        var divUser;
        divUser = this.parentNode.parentNode;
        select('#id').value = divUser.children[1].dataset.id;
        select('input[name="civility"][value="' + divUser.children[1].dataset.civility + '"]').checked = true;
        select('#first-name').value = divUser.children[1].dataset.firstName;
        select('#last-name').value = divUser.children[1].dataset.lastName;
        select('#age').value = divUser.children[1].dataset.age;
        select('#email').value = divUser.children[1].dataset.email;
        select('#color-background').value = divUser.children[1].dataset.colorBackground;
        select('#color-title').value = divUser.children[1].dataset.colorTitle;
    };
    
    deleteUser = function () {
        var divUser, divUsers, fd, xhr, user, i;
        user = {};
        user.id = this.parentNode.parentNode.children[1].dataset.id;
        user.indexOrder = this.parentNode.parentNode.children[1].dataset.indexOrder;
        fd = new window.FormData();
        fd.append('user', JSON.stringify(user));
        
        xhr = new XMLHttpRequest();
        xhr.open('POST', '/delete');
        xhr.send(fd);
        xhr.onreadystatechange = function (response) {
            //if user.save/update is ok
            if (xhr.readyState === 4 && xhr.status === 200) {
                divUser = select('#user-' + user.id);
                divUsers = select('#users');
                divUsers.removeChild(divUser);
                for (i = 0; i < divUsers.children.length; i += 1) {
                    if (divUsers.children[i].id > user.id) {
                        divUsers.children[i].children[1].dataset.indexOrder -= 1;
                    }
                }
            }
        };
    };
    
    dragStartUser = function (event) {
        var divUser, users, divTop, divLeft, divClone, divUsers;
        //event.dataTransfer.setData('text/plain', null);
        divUser = this.parentNode.parentNode;
        users = select('#users').children;

        [].forEach.call(users, function (user) {
            if (user.id !== divUser.id) {
                user.classList.add('dropable');
                user.style.zIndex = "5";
            } else {
                user.classList.add('on-drag');
            }
        });
        dragDiv = divUser;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData('text/html', divUser.innerHTML);
    };
    
    dragEnterUser = function (event) {
        if (this.classList.contains('dropable')) {
            this.classList.add('over');
            event.preventDefault();
        }
    };
    dragLeaveUser = function (event) {
        if (this.classList.contains('dropable')) {
            this.classList.remove('over');
        }
    };
    dragOverUser = function (event) {
        if (event.preventDefault) { event.preventDefault(); }
        if (event.stopPropagation) { event.stopPropagation(); }
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();
        return false;
    };
    
    dropUser = function (event) {
        var x, fd, xhr, indexOrderArray;
        indexOrderArray = {};
        if (event.preventDefault) { event.preventDefault(); }
        if (event.stopPropagation) { event.stopPropagation(); }
        if (dragDiv !== this) {

            dragEndUser(dragDiv);
            dragEndUser(this);
            
            dragDiv.innerHTML = this.innerHTML;
            this.innerHTML = event.dataTransfer.getData('text/html');
            
            x = dragDiv.children[1].dataset.indexOrder;
            dragDiv.children[1].dataset.indexOrder = this.children[1].dataset.indexOrder;
            this.children[1].dataset.indexOrder = x;
            

            dragDiv.id = 'user-' + dragDiv.children[1].dataset.id;
            this.id = 'user-' + this.children[1].dataset.id;
            
            indexOrderArray.userId = dragDiv.children[1].dataset.id;
            indexOrderArray.userId2 = this.children[1].dataset.id;
            indexOrderArray.userIndex = dragDiv.children[1].dataset.indexOrder;
            indexOrderArray.userIndex2 = this.children[1].dataset.indexOrder;
            
            fd = new window.FormData();
            fd.append('indexOrderArray', JSON.stringify(indexOrderArray));
            
            xhr = new XMLHttpRequest();
            xhr.open('POST', '/indexOrderRange');
            xhr.send(fd);
            
            createDivListener(dragDiv);
            createDivListener(this);
        }
    };
    
    dragEndUser = function (event) {
        var users;
        users = select('#users').children;

        [].forEach.call(users, function (user) {
            user.classList.remove('dropable');
            user.classList.remove('on-drag');
            user.classList.remove('over');
        });

    };
    
    createDivListener = function (div) {
        var links;
        links = selectAll('#' + div.id + ' img');
        links[0].addEventListener('click', transfertUser, false);
        links[1].addEventListener('click', deleteUser, false);
        links[2].addEventListener('dragstart', dragStartUser, false);
        links[2].addEventListener('dragend', dragEndUser, false);
        div.addEventListener('dragenter', dragEnterUser, false);
        div.addEventListener('dragleave', dragLeaveUser, false);
        div.addEventListener('dragover', dragOverUser, false);
        div.addEventListener('drop', dropUser, false);
    };
    
    removeDivListener = function (div) {
        var links;
        links = selectAll('#' + div.id + ' img');
        links[0].removeEventListener('click', transfertUser, false);
        links[1].removeEventListener('click', deleteUser, false);
        links[2].removeEventListener('dragstart', dragStartUser, false);
        links[2].removeEventListener('dragend', dragEndUser, false);
        div.removeEventListener('dragenter', dragEnterUser, false);
        div.removeEventListener('dragleave', dragLeaveUser, false);
        div.removeEventListener('dragover', dragOverUser, false);
        div.removeEventListener('drop', dropUser, false);
    };
    
                              
    clearForm = function () {
        select('#id').value = null;
        select('input[name="civility"]:checked').checked = false;
        select('#first-name').value = null;
        select('#last-name').value = null;
        select('#age').value = null;
        select('#email').value = null;
        select('#color-background').value = '#7E89A2';
        select('#color-title').value = '#082035';
    };
    
    observe = function () {
        var i, users, links;
        select('#ajouter').addEventListener('click', addAndUpdateUser);
        select('#clear-form').addEventListener('click', clearForm);
        users = select('#users').children;
        for (i = 0; i < users.length; i += 1) {
            createDivListener(users[i]);
        }
        dragDiv = null;
        log('!! Info !! L\'érreur : "TypeError: $(...).offset(...) is undefined" n\'est pas liée à la page actuel. la solution arriveras avec la refonte de mon site.');
    };
    
    window.addEventListener('load', observe);
    
    return {
        m1: methode1,
        m2: methode2,
        m3: addAndUpdateUser
    };
}());