<template>
  <div class="boards">
    <div class="">
      <div class="header">
        <button class="btn btn-danger" @click="logout">Logout</button>
      </div>
      <div class="row" style="justify-content:center">
        <div class="card col-sm-2 mx-2" v-for="board in boards" :key="board._id">
          <div class="title" @click="activeBoard(board._id)">
            {{board.title}}
          </div>
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <button class="btn btn-success">View Board</button>
          </router-link>
          <button class="btn btn-danger" @click="deleteBoard(board._id)"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="boards-form">
        <QuickModal class="form-btn">
          <form @submit.prevent="addBoard">
            <input type="text" placeholder="title" v-model="newBoard.title" required>
            <input type="text" placeholder="description" v-model="newBoard.description">
            <button type="submit">Create Board</button>
          </form>
        </QuickModal>
      </div>
    </div>
  </div>
</template>

<script>
  import QuickModal from "@/components/QuickModal.vue"
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      activeBoard(boardId) {
        this.$store.dispatch("activeBoard", boardId)
      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      QuickModal
    }
  };
</script>

<style scoped>
  .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 1rem;
  }

  .delete-btn {
    border-radius: 50%;
    cursor: pointer;
    transition: .3s;
  }

  .delete-btn:hover {
    background-color: red;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
  }

  .boards {
    height: 100vh;
    padding: 4rem;
  }

  .all {
    background-color: #e4f9f5;
    height: 100%;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
    /* display: flex; */
    /* justify-content: center; */
    /* flex-wrap: wrap; */

  }

  .a-board {
    width: 100%;
    height: fit-content;
    border-bottom: 1px solid black;
    padding: .5rem;
    display: flex;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    color: black;
  }

  /* .form-btn {
    justify-content: flex-end;
  } */
</style>