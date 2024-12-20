import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

socket.on('userConnection', (id) => {
    console.log(`User ${id} connected.`);
});

/*
<script type="module">
  import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

  const socket = io();
</script>
*/