const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const userName = urlSearch.get('username');
const room = urlSearch.get('select_room');
const InputMessageSend = document.getElementById('message_send');
const messagesDIV = document.getElementById('messages');
const userNameDIV = document.getElementById('username');
const BtnLogOut = document.getElementById('logout');

userNameDIV.innerHTML = `Olá <strong>${userName}</strong> - Você está na Sala <strong>${room}</strong>`;

socket.emit('select_room', {
    userName,
    room,
}, messages => {
    messages.forEach(message => CreateMessage(message));
})

InputMessageSend.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        const message = event.target.value;

        const data = {
            room,
            message,
            userName
        }

        socket.emit('message', data);
        event.target.value = '';
    }
});

socket.on('message', data => {

    CreateMessage(data);
})


const CreateMessage = (data) => {
    messagesDIV.innerHTML += `
        <div class="new_message">
            <label class="form-label">
                <strong>${data.username}</strong><span>${data.text} - <em>${dayjs(data.created_at).format('DD/MM HH:mm')}</em></span>
            </label>
        </div>
    `;
}


BtnLogOut.addEventListener('click', () => {
    window.location.href = 'index.html';
})







