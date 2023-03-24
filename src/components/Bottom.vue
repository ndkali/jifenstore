<template>
  <div class="bottom">

    <div class="service">
      <div class="l">
        <div>
          <p>1</p>
          <ol>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ol>
        </div>

        <div>
          <p>1</p>
          <ol>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ol>
        </div>

        <div>
          <p>1</p>
          <ol>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ol>
        </div>

      </div>
      <div class="r">
        <p>telephone</p>
      </div>
    </div>
    <div class="message">
      <hr />
      <ul>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
      </ul>

      <ul>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
      </ul>

      <ul>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
        <li><a href="#">官网</a></li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Bottom',

}
</script>


<style scoped>
.bottom {
  width: 100%;
  background-color: rgb(60, 60, 60);
  color: aliceblue
}

li a {
  color: aliceblue;
  font-size: 10px;
}

li {
  list-style: none;
}

.bottom div {
  width: 1200px;
  margin: 0 auto;
  /* background-color: cadetblue; */
}

.bottom .special ol {
  display: flex;
  justify-content: space-between;
}

.bottom .special ol li {
  margin-right: 100px;
}

.service {
  display: flex;
  justify-content: space-between
}

.service .l {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.service .l div {
  /* width: 20%; */
  display: block;
}

.service .l div p {
  font-size: larger;
  /* display: block; */
  margin-bottom: 20px;
}

.message {
  margin: 0 auto;
  /* display: flex; */
  /* flex-direction: column; */
}

.message ul {
  display: flex;
  /* justify-content: start; */
}

.message ul li {
  /* align-self: start; */
  margin-right: 5px;
}
</style>
