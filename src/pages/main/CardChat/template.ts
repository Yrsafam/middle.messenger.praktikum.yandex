const template = `
<li class="card-chat js-card-chat">
    <span class="card-chat__avatar-circle"></span>
    <div class="card-chat__content">
        <div class="card-chat__main-information">
            <p class="card-chat__name">
                {{name}}
            </p>
            <span class="card-chat__last-time">{{lastTime}}</span>
        </div>
        <div class="card-chat__second-information">
            <span class="card-chat__message">
                {{#if isMe}}
                    <span class="card-chat__message_accent">Вы:</span>
                {{/if}}
                {{message}}
            </span>
            {{#if count}}
                <span class="card-chat__count-message">{{count}}</span>
            {{/if}}
        </div>
    </div>
</li>
`;

export default template;
