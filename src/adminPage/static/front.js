const fields = new Map();

const ID = {
    selectTitle: 'titleName',
    selectSubtitle: 'subtitleName',
    ulSubtitleData: 'subtitleData',
    container: 'container',
    objectForm: 'dynamic__object',
    fileChooser: 'fileChooser',
    inputs: {
        titleName: 'titleInput',
        fieldName: 'fieldInput'
    },
    selectStudyForm : 'studyForm',
    selectStudyDegree : 'studyDegree',
    selectDirection : 'direction',
    selectSpecialty : 'specialty'
};

const windows = {
    title: 'title',
    subtitle: 'subtitle',
    fieldAdd: 'field_add',
    fieldEdit: 'field_edit',
    fieldDelete: 'field_delete',
    objectEdit: 'object_edit',

    studyForm: 'studyForm_',
    studyDegree: 'studyDegree_',
    direction: 'direction_',
    speciality: 'speciality_'
};

let currentTitle = '';
let currentSubtitle = -1;
let currentData = {};

let currentStudyForm = '';
let currentStudyDegree = '';
let currentDirectionIndex1 = 0;
let currentDirection = '';
let currentDirectionIndex = 0;

const containers = [];



function save() {
    const type = 'data:application/octet-stream;base64, ';
    const text = JSON.stringify(currentData, null, 2);
    const base = utf8_to_b64(text);
    const res = type + base;

    const fileName = document.getElementById(ID.fileChooser).files[0].name;

    const link = document.createElement('a');
    link.setAttribute('href', res);
    link.setAttribute('download', fileName);
    link.click();

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
}

function load() {
    const input = document.getElementById(ID.fileChooser);


    const reader = new FileReader();

    reader.onload = () => {
        const data = JSON.parse(reader.result);

        fields.clear();
        currentData = data;

        parseJSON();
    }
    reader.onerror = () => console.error(reader.error);
    
    reader.readAsText(input.files[0]);
}


function addSelection(selectId, windowName, removeWindowFunc, onSelectionChange) {
    const divSubtitleContainer = document.createElement('div'); divSubtitleContainer.className = 'subtitleContainer';
    const select = document.createElement('select'); select.id = selectId; select.onchange = onSelectionChange;

    const divButtons = document.createElement('div'); divButtons.className = 'buttons';
    divButtons.append(createButton('Добавить', () => createWindow(windowName)));
    divButtons.append(createButton('Редактировать', () => createWindow(windowName, true)));
    divButtons.append(createButton('Удалить',() => removeWindowFunc()));

    divSubtitleContainer.append(divButtons);
    divSubtitleContainer.append(select);

    const lastContainer = document.getElementsByClassName('subtitleContainer');

    if (lastContainer.length) lastContainer[lastContainer.length - 1].after(divSubtitleContainer);
    else document.getElementById('titleContainer').prepend(divSubtitleContainer);

    containers.push(divSubtitleContainer);
}

function removeElements(elements) {
    for (let i = elements.length - 1; i >= 0; i--) {
        elements[i].remove();
        elements.splice(-1, 1);
    }
}

async function logIn() {
    try {
        const resGetUserData = await fetch('http://localhost:3000/login');
        
        const resData = await resGetUserData.json();
        if (resData.isAuth) return;
    
        const formLogin = document.forms['formLogin'];
    
        if (!formLogin) {
            goToPage('login');
            return;
        }
    
        const data = {
            login: formLogin.login,
            password: formLogin.password
        }
    
        console.log(data);
    
        await fetch('http://localhost:3000/login',
        {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }
    catch(error) {
        console.error('No connection with server');
    }
}

async function logOut() {
    try {
        await fetch('http://localhost:3000/logout');
        goToPage('login');
    } catch (error) {
        console.error('No connection');
    }
}

function createWindow(windowType, isChangeValues, objectField) {
    const container = document.getElementById(ID.container);
    const divWindow = document.createElement('div');
    divWindow.id = windowType;

    container.append(divWindow);

    const divContainer = document.createElement('div');
    divWindow.append(divContainer);

    const buttonCancel = createButton('Отмена', () => deleteWindow(windowType));

    switch (windowType) {
        case windows.title:
            createTitle();
            break;
        case windows.subtitle:
            createSubtitle();
            break;
        case windows.fieldAdd:
            createField();
            break;
        case windows.fieldDelete:
            createFieldDelete();
            break;
        case windows.fieldEdit:
            createFieldEdit();
            break;
        case windows.objectEdit:
            createObjectEdit();
            break;
        case windows.studyForm:
            createStudyForm();
            break;
        case windows.studyDegree:
            createStudyDegree();
            break;
        case windows.direction:
            createDirection();
            break;
        case windows.speciality:
            createSpeciality();
            break;
        default:
            return;
    }

    divWindow.append(buttonCancel);

    function createTitle() {
        const input = createInput('Название', ID.inputs.titleName, isChangeValues ? currentTitle : '');
        divContainer.append(input);


        const buttonApply = createButton('Принять', () => addOrEditTitle(isChangeValues));
        divWindow.append(buttonApply);
    }

    function createSubtitle() {
        fields.forEach((value, key) => {
            if (value === 'object') {
                const button = createButton(key, () => createWindow(windows.objectEdit, isChangeValues, key));
                divContainer.append(button);

                return;
            }


            const input = createInput(key, `dynamic__${key}`, isChangeValues ? currentData[currentTitle][currentSubtitle][key] : '');
            divContainer.append(input);
        });


        const buttonApply = createButton('Принять', () => addOrEditSubtitle(isChangeValues ? currentSubtitle : Object.keys(currentData[currentTitle]).length, isChangeValues));
        divWindow.append(buttonApply);
    }

    function createField() {
        const input = createInput('Название поля', ID.inputs.fieldName);
        divContainer.append(input);


        const buttonCreateObject = createButton('Объект', () => {
            createWindow(windows.objectEdit, false, input.value);
        });
        divWindow.append(buttonCreateObject);

        const buttonApply = createButton('Принять', () => addField());
        divWindow.append(buttonApply);
    }

    function createFieldDelete() {
        divContainer.remove();

        buttonCancel.id = 'editCancel';

        fields.forEach((value, key) => {
            const button = createButton(key, () => {
                subtitleForEach(direction => delete direction[key]);

                fields.delete(key);
                button.remove();

                updateSubtitleData();
            });

            divWindow.append(button);
        });
    }

    function createFieldEdit() {
        throw new Error('createFieldEdit is not implemented');
    }

    function createObjectEdit() {
        const object = currentData[currentTitle][currentSubtitle][objectField];

        if (isChangeValues) {
            for (const [key, value] of Object.entries(object)) {
                const input = createInput(key, `dynamic__${key}`, value);
                divContainer.append(input);
            }
        } else {
            const buttonCreateField = createButton('Создать поле', () => {
                createWindow(windows.fieldAdd);
            });
            divWindow.append(buttonCreateField);
        }

        const buttonApply = createButton('Принять', () => {
            Object.keys(object).forEach(key =>
                currentData[currentTitle][currentSubtitle][objectField][key] = convertToNumber(document.getElementById(`dynamic__${key}`).value)
            );

            deleteWindow(windows.objectEdit);

            updateSubtitleData();
        });

        divWindow.append(buttonApply);
    }




    function createStudyForm() {
        const input = createInput('Название', ID.inputs.titleName, isChangeValues ? currentStudyForm : '');
        divContainer.append(input);


        const buttonApply = createButton('Принять', () => addOrEditStudyForm(isChangeValues));
        divWindow.append(buttonApply);
    }

    function createStudyDegree() {
        const input = createInput('Название', ID.inputs.titleName, isChangeValues ? currentStudyDegree : '');
        divContainer.append(input);


        const buttonApply = createButton('Принять', () => addOrEditStudyDegree(isChangeValues));
        divWindow.append(buttonApply);
    }

    function createDirection() {
        const input = createInput('Название', ID.inputs.titleName, isChangeValues ? currentDirection : '');
        divContainer.append(input);


        const buttonApply = createButton('Принять', () => addOrEditDirection(isChangeValues));
        divWindow.append(buttonApply);
    }

    function createSpeciality() {
        fields.forEach((value, key) => {
            if (value === 'object') {
                const button = createButton(key, () => createWindow(windows.objectEdit, isChangeValues, key));
                divContainer.append(button);

                return;
            }


            const input = createInput(
                key, 
                `dynamic__${key}`, 
                isChangeValues ? currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][currentDirectionIndex][key] : '');
            divContainer.append(input);
        });


        const buttonApply = createButton(
            'Принять',
             () => addOrEditSpecialities(
                 isChangeValues 
                 ? currentDirectionIndex 
                 : Object.keys(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection]).length,
                  isChangeValues));
        divWindow.append(buttonApply);
    }
}

function deleteWindow(windowID) {
    const divWindow = document.getElementById(windowID);

    divWindow.remove();
}


function updateTitleData() {
    const selectFaculty = document.getElementById(ID.selectTitle);

    currentTitle = selectFaculty.value;

    currentSubtitle = 0;

    updateSubtitles();
}

function updateSubtitleData() {
    const selectSubtitle = document.getElementById(ID.selectSubtitle);

    const ul = document.getElementById(ID.ulSubtitleData);
    ul.innerHTML = '';

    if (!selectSubtitle.value) return;

    currentSubtitle = selectSubtitle.value;

    fields.forEach((value, key) => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${key}</b>: `;

        handleData(currentData[currentTitle][currentSubtitle][key], li);

        ul.append(li);
    });
}


function handleData(data, liOuter) {
    if (!data) return;
    if (typeof data == 'string' || typeof data == 'number')
        liOuter.innerHTML += convertToAny(data);
    else {
        const ulInner = document.createElement('ul');
        liOuter.append(ulInner);

        if (!Array.isArray(data)) {
            for (const [key, value] of Object.entries(data)) {
                const liInner = document.createElement('li');
                liInner.innerHTML = `<b>${key}</b>: `;
                
                ulInner.append(liInner);

                if (typeof value !== 'object') liInner.innerHTML += convertToAny(value);
                else handleData(value, liInner);
            }
        } else {
            for (const value of Object.values(data)) {
                const emptySpace = '&#160;';
                const liInner = document.createElement('li');
                liInner.innerHTML = emptySpace;

                ulInner.type = 'none';
                ulInner.append(liInner);

                if (typeof value !== 'object') liInner.innerHTML = convertToAny(value);
                else handleData(value, liInner);
            }
        }
    }
}



function addOrEditStudyForm(isEditTitle) {
    const input = document.getElementById(ID.inputs.titleName);

    if (!isEditTitle) 
        currentData[input.value] = {};
    else delete Object.assign(currentData, {
        [input.value]: currentData[currentStudyForm]
    })[currentStudyForm];

    currentStudyForm = input.value;

    updateForms();

    deleteWindow(windows.studyForm);
}

function removeStudyForm() {
    const selectStudyForm = document.getElementById(ID.selectStudyForm);

    delete(currentData[selectStudyForm.value]);

    currentStudyForm = Object.keys(currentData)[0] ?? '';

    updateForms();
}


function addOrEditStudyDegree(isEditTitle) {
    const input = document.getElementById(ID.inputs.titleName);

    if (!isEditTitle) currentData[currentStudyForm][input.value] = [];
    else delete Object.assign(currentData[currentStudyForm], {
        [input.value]: currentData[currentStudyForm][currentStudyDegree]
    })[currentStudyDegree];

    currentStudyDegree = input.value;

    updateStudyDegrees();

    deleteWindow(windows.studyDegree);
}

function removeStudyDegree() {
    const selectStudyDegree = document.getElementById(ID.selectStudyDegree);

    delete(currentData[currentStudyForm][selectStudyDegree.value]);

    currentStudyDegree = Object.keys(currentData[currentStudyForm])[0] ?? '';

    updateForms();
}


function addOrEditDirection(isEditTitle) {
    const input = document.getElementById(ID.inputs.titleName);

    if (!isEditTitle) {
        currentData[currentStudyForm][currentStudyDegree].push({});
        currentData[currentStudyForm][currentStudyDegree][Object.keys(currentData[currentStudyForm][currentStudyDegree]).length-1][input.value] = []
    }
    else delete Object.assign(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1], {
        [input.value]: currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection]
    })[currentDirection];

    currentDirection = input.value;

    updateDirections();

    deleteWindow(windows.direction);
}

function removeDirection() {
    const selectTitle = document.getElementById(ID.selectDirection);

    delete(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][selectTitle.value]);

    currentDirection = Object.keys(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1])[0] ?? '';

    updateForms();
}

function addOrEditSpecialities(subtitleIndex, isEditSubtitle) {
    if (!isEditSubtitle) currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][subtitleIndex] = {}

    fields.forEach((value, key) => {
        const input = document.getElementById(`dynamic__${key}`);
        if (!input) return;

        currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][subtitleIndex][key] = convertToNumber(input.value);
    });

    currentDirectionIndex = subtitleIndex;

    updateSpecialities();

    deleteWindow(windows.speciality);
}

function removeSpecialities() {
    const selectSpecialty = document.getElementById(ID.selectSpecialty);

    if (!currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][selectSpecialty.value]) return;

    currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection].splice(currentDirectionIndex, 1);

    if (--currentDirectionIndex < 0) currentDirectionIndex = 0;

    updateForms();
}




function addOrEditTitle(isEditTitle) {
    const input = document.getElementById(ID.inputs.titleName);

    if (!isEditTitle) currentData[input.value] = [];
    else delete Object.assign(currentData, {
        [input.value]: currentData[currentTitle]
    })[currentTitle];

    currentTitle = input.value;

    updateTitles();

    deleteWindow(windows.title);
}

function removeTitle() {
    const selectTitle = document.getElementById(ID.selectTitle);

    delete(currentData[selectTitle.value]);

    currentTitle = Object.keys(currentData)[0] ?? '';

    updateTitles();
}



function addOrEditSubtitle(subtitleIndex, isEditSubtitle) {
    if (!isEditSubtitle) currentData[currentTitle][subtitleIndex] = {}

    fields.forEach((value, key) => {
        const input = document.getElementById(`dynamic__${key}`);
        if (!input) return;

        currentData[currentTitle][subtitleIndex][key] = convertToNumber(input.value);
    });

    currentSubtitle = subtitleIndex;

    updateSubtitles();

    deleteWindow(windows.subtitle);
}

function removeSubtitle() {
    const selectTitle = document.getElementById(ID.selectTitle);

    if (!currentData[selectTitle.value]) return;

    currentData[selectTitle.value].splice(currentSubtitle, 1);

    if (--currentSubtitle < 0) currentSubtitle = 0;

    updateTitles();
}




function addField() {
    const input = document.getElementById(ID.inputs.fieldName);

    const newField = input.value;

    fields.set(newField, typeof newField);

    subtitleForEach(direction => direction[newField] = '');

    updateSubtitleData();

    deleteWindow(windows.fieldAdd);
}

//#region Help functions

function goToPage(page = 'index') {
    const path = location.origin + `/${page}.html`;
    if (location.href != path) location.href = path;
}

function subtitleForEach(action) {
    Object.keys(currentData).forEach(title =>
        currentData[title].forEach(subtitle => action(subtitle))
    );
}

function updateTitles() {
    const selectTitle = document.getElementById(ID.selectTitle);
    selectTitle.innerHTML = '';

    Object.keys(currentData).forEach(title => {
        const optionTitle = document.createElement('option');
        optionTitle.innerHTML = title;
        selectTitle.append(optionTitle);
    });

    selectTitle.value = currentTitle;

    updateSubtitles();
}

function updateSubtitles() {
    const selectSubtitle = document.getElementById(ID.selectSubtitle);
    selectSubtitle.innerHTML = '';

    if (!Object.keys(currentData).length) return;

    currentData[currentTitle].forEach((title, i) => {
        if (!Object.keys(title).length) return;

        const option =  title[fields.keys().next().value];
        let innerHTML = option;

        if (typeof option != 'string') {
            innerHTML = Object.keys(option)[0];
        }

        const optionSubtitle = document.createElement('option');
        optionSubtitle.innerHTML = innerHTML;
        optionSubtitle.value = i;

        selectSubtitle.append(optionSubtitle);
    });

    selectSubtitle.value = currentSubtitle;

    updateSubtitleData();
}


function createButton(text, action) {
    const button = document.createElement('button');
    button.addEventListener('click', action);
    button.innerHTML = text;

    return button;
}

function createInput(placeholder, id, value = '', type = 'text') {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.id = id;
    input.value = value;

    return input;
}

//#endregion


function convertToNumber(value) {
    if (value && !isNaN(+value)) value = `<i>${value}</i>`;
    return value;
}


function convertToHref(value) {
    if (typeof value == 'string' && value.includes('http')) value = `<a href='${value}'>${value}</a>`;
    return value;
}

function convertToAny(value) {
    value = convertToHref(value);
    value = convertToNumber(value);
    return value;
}



function parseJSON() {
    if (containers.length == 2) {
        currentTitle = Object.keys(currentData)[0];
        currentSubtitle = 0;
        Object.entries(currentData[currentTitle][currentSubtitle]).forEach((key) => fields.set(key[0], typeof key[1]));

        updateTitles();
    }
    else if (containers.length == 4){
        currentStudyForm = Object.keys(currentData)[0];
        currentStudyDegree = Object.keys(currentData[currentStudyForm])[0];
        currentDirectionIndex1 = Object.keys(currentData[currentStudyForm][currentStudyDegree])[0];
        currentDirection = Object.keys(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex])[0];
        currentDirectionIndex = 0;
        Object.entries(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][0]).forEach((key) => fields.set(key[0], typeof key[1]));

        updateForms();
    }
    else console.error('wrong', containers.length);
}



function selectJSONParser(value) {
    switch (value) {
        case 'directions':
            addDirectionsJSONParser();
            break;

        default:
            addOtherJSONParser();
            break;
    }
}


function addOtherJSONParser() {
    removeElements(containers);

    addSelection('titleName', 'title', removeTitle, updateTitleData);
    addSelection('subtitleName', 'subtitle', removeSubtitle, updateSubtitleData);
}

function addDirectionsJSONParser() {
    removeElements(containers);

    addSelection('studyForm', windows.studyForm, removeStudyForm, updateStudyFormData);
    addSelection('studyDegree', windows.studyDegree, removeStudyDegree, updateStudyDegreeData);
    addSelection('direction', windows.direction, removeDirection, updateDirectionData);
    addSelection('specialty', windows.speciality, removeSpecialities, updateSpecialityData);
}





function updateStudyFormData() {
    const selectStudyForm = document.getElementById(ID.selectStudyForm);

    currentStudyForm = selectStudyForm.value;

    currentStudyDegree = Object.keys(currentData[currentStudyForm])[0];
    currentDirection = Object.keys(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1])[0];
    currentDirectionIndex = 0;

    updateStudyDegrees();
}

function updateForms() {
    const selectStudyForm = document.getElementById(ID.selectStudyForm);
    selectStudyForm.innerHTML = '';

    Object.keys(currentData).forEach(title => {
        const optionTitle = document.createElement('option');
        optionTitle.innerHTML = title;
        selectStudyForm.append(optionTitle);
    });

    selectStudyForm.value = currentStudyForm;

    updateStudyDegrees();
}


function updateStudyDegreeData() {
    const selectStudyDegree = document.getElementById(ID.selectStudyDegree);

    currentStudyDegree = selectStudyDegree.value;

    currentDirection = Object.keys(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1])[0];
    currentDirectionIndex = 0;

    updateDirections();
}

function updateStudyDegrees() {
    const selectStudyDegree = document.getElementById(ID.selectStudyDegree);
    selectStudyDegree.innerHTML = '';

    Object.keys(currentData[currentStudyForm]).forEach(title => {
        const optionTitle = document.createElement('option');
        optionTitle.innerHTML = title;
        selectStudyDegree.append(optionTitle);
    });

    selectStudyDegree.value = currentStudyDegree;

    updateDirections();
}


function updateDirectionData() {
    const selectDirection = document.getElementById(ID.selectDirection);

    currentDirection = selectDirection.value;

    currentDirectionIndex = 0;

    updateSpecialities();
}

function updateDirections() {
    const selectDirection = document.getElementById(ID.selectDirection);
    selectDirection.innerHTML = '';

    if (!currentData[currentStudyForm][currentStudyDegree]) {
        updateSpecialities();
        return;
    }

    Object.keys(currentData[currentStudyForm][currentStudyDegree]).forEach(title => {
        const optionTitle = document.createElement('option');
        optionTitle.innerHTML = Object.keys(currentData[currentStudyForm][currentStudyDegree][title])[0];
        selectDirection.append(optionTitle);
    });

    selectDirection.value = currentDirection;

    updateSpecialities();
}


function updateSpecialityData() {
    const selectSpecialty = document.getElementById(ID.selectSpecialty);

    const ul = document.getElementById(ID.ulSubtitleData);
    ul.innerHTML = '';

    if (!selectSpecialty.value) return;

    currentDirectionIndex = selectSpecialty.value;

    fields.forEach((value, key) => {
        const li = document.createElement('li');
        li.innerHTML = `<b>${key}</b>: `;

        handleData(currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection][currentDirectionIndex][key], li);

        ul.append(li);
    });
}

function updateSpecialities() {
    const selectSpecialty = document.getElementById(ID.selectSpecialty);
    selectSpecialty.innerHTML = '';

    if (!currentData[currentStudyForm][currentStudyDegree] || !Object.keys(currentData[currentStudyForm][currentStudyDegree]).length || !currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection]){
        updateSpecialityData();
        return;
    }

    currentData[currentStudyForm][currentStudyDegree][currentDirectionIndex1][currentDirection].forEach((title, i) => {
        if (!Object.keys(title).length) return;

        const option =  title[fields.keys().next().value];
        let innerHTML = option;

        if (typeof option != 'string') {
            innerHTML = Object.keys(option)[0];
        }

        const optionSubtitle = document.createElement('option');
        optionSubtitle.innerHTML = innerHTML;
        optionSubtitle.value = i;

        selectSpecialty.append(optionSubtitle);
    });

    selectSpecialty.value = currentDirectionIndex;

    updateSpecialityData();
}