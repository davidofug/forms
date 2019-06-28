/*
**N.B: ES6 code ahead
**Make sure code runs after window object has loaded
*/
window.onload = () => {
    /*Select tab menu items*/
    const TAB_MENU_ITEMS = document.querySelectorAll('.tab-menu-item')
    /*Select the actual tabs*/
    const TABS = document.querySelectorAll('.tab')

    /*Attach highlight to default tab menu item
    *.highlight class @styles.css applying background(white) to active tab menu item
    */
    document.querySelector('.tab-menu-item.default').classList.add('highlight')
    /*Attach active to default tab
    *.active class @styles.css apply display block to activate tab
    */
    document.querySelector('.tab.default').classList.add('active')
    /*
    *@REMOVE_HIGHTLIGHT: Inactive tab menu items remove .highlight
    */
    const REMOVE_HIGHLIGHT = () => TAB_MENU_ITEMS.forEach(TAB_MENU_ITEM => TAB_MENU_ITEM.classList.remove('highlight'))
    /*Loop: Tab menu items*/
    TAB_MENU_ITEMS.forEach(TAB_MENU_ITEM => {
        /*TAB_MENU_ITEM: Bind click event*/
        TAB_MENU_ITEM.addEventListener('click', e => {
            /*
            *@getAttribute('data-target'): get name of tab to activate,
            */
            const TAB_TARGET = TAB_MENU_ITEM.getAttribute('data-target')

            /*Removing the highlight*/
            REMOVE_HIGHLIGHT()
            /*Loop tabs*/
            TABS.forEach(TAB => {
                /*Toggle .active class on tab.*/
                TAB.getAttribute('data-tab') != TAB_TARGET ? TAB.classList.remove('active') : TAB.classList.add('active')
                /*Clicked tab menu item, attach .highlight*/
                e.currentTarget.classList.add('highlight')
            })
        })
    })

    /*@INPUTS
    **Select the text, password, textarea inputs. Used later
    */
    const INPUTS = document.querySelectorAll('input[type=text],input[type=password],textarea')

    /*
    **Optimization
    **Check: INPUTS has elements?
    **Avoid errors
    */
    if (INPUTS.length > 0) {
        /*INPUTS: Looping*/
        INPUTS.forEach(INPUT => {
            /*@FOCUS: bind to INPUT*/
            INPUT.addEventListener('focus', (e) => {
                /*Get parent of INPUT in focus*/ 
                const PARENT = e.currentTarget.parentNode
                /*Is class .field-body present on parent?
                **@True: attach active class to parent
                **.active css class has styles to transform grey border/icon to colored
                */
                if(PARENT.classList.contains('field-body')) PARENT.classList.add('active')
            })
            /*@BLUR: bind to INPUT*/
            INPUT.addEventListener('blur', e => {
                /*Get parent of INPUT in focus*/
                const PARENT = e.currentTarget.parentNode
                /*remove .active*/
                if (PARENT.classList.contains('active')) PARENT.classList.remove('active')
            })
        })
    }
    /*Select all eye icons
    **Store them in PASSWORD_ICONS identifier
    */
    const PASSWORD_ICONS = document.querySelectorAll('.icon.eye')

    /*PASSWORD_ICONS must be present*/
    if(PASSWORD_ICONS.length > 0) {

        /*Loop icons*/
        PASSWORD_ICONS.forEach( PASSWORD_ICON => {
            /*@Click: Bind to Icon*/
            PASSWORD_ICON.addEventListener('click',e => {
                /*Retrieve data-field attribute
                **Store value in FIELD_ID
                */
               const FIELD_ID = PASSWORD_ICON.getAttribute('data-field') != null ? PASSWORD_ICON.getAttribute('data-field') : null
                
                if(FIELD_ID != null) {
                   const PASSWORD_FIELD = document.getElementById(FIELD_ID)
                   /*Toggle PASSWORD type attribute. To show/hide password*/ 
                    PASSWORD_FIELD.type = PASSWORD_FIELD.type == 'password' ? 'text' : 'password'
                }
            })
        })
    }
}