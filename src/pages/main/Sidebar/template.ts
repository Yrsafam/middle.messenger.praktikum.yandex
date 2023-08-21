const template = `
<aside class="sidebar-chats">
    <div class="sidebar-chats__head">
        <a href="profile.html" class="sidebar-chats__link-profile">
            Профиль
            <img src="/images/arrow-profile.svg" alt="Иконка перехода в профиль">
        </a>
        <label class="sidebar-chats__input">
            <input type="text" class="sidebar-chats__input-field">
            <span class="sidebar-chats__input-placeholder">
                <img 
                    src="/images/search.svg" 
                    class="sidebar-chats__input-icon" alt="Иконка поля поиска"
                >
                <span class="sidebar-chats__input-placeholder-text">Поиск</span>
            </span>
        </label>
    </div>
    <ul class="sidebar-chats__list">
        {{#each chats}}
            {{{CardChat name=name message=message lastTime=lastTime count=count isMe=isMe }}}
        {{/each}}
    </ul>
</aside>
`;

export default template;
