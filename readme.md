# 📘 Readme (Assignment-005)

---

## ✅ Answer Section

### 1. Difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**

- **getElementById("id")**

  - খুঁজে আনে নির্দিষ্ট **id** দিয়ে একটিমাত্র element।
  - সবসময় **একটা মাত্র element** return করবে।
  - Example:
    ```js
    const title = document.getElementById("main-title");
    ```

- **getElementsByClassName("class")**

  - একই class নাম থাকা সব element কে খুঁজে আনে।
  - এটি **HTMLCollection** return করে (array-like object)।
  - Example:
    ```js
    const items = document.getElementsByClassName("list-item");
    ```

- **querySelector("selector")**

  - CSS selector ব্যবহার করে **প্রথম পাওয়া element** return করে।
  - Example:
    ```js
    const firstItem = document.querySelector(".list-item");
    ```

- **querySelectorAll("selector")**
  - CSS selector ব্যবহার করে **সব element** return করে।
  - এটি **NodeList** return করে, যেটিতে লুপ চালানো যায়।
  - Example:
    ```js
    const allItems = document.querySelectorAll(".list-item");
    ```

---

### 2. How do you create and insert a new element into the DOM?

✅ New element তৈরি করার ধাপ:

1. `document.createElement("tagName")` দিয়ে element তৈরি করা।
2. `innerText` বা `setAttribute()` দিয়ে content বা attribute সেট করা।
3. `appendChild()`, `append()`, `prepend()` ইত্যাদি দিয়ে DOM এ যুক্ত করা।

👉 Example:

```js
const newDiv = document.createElement("div");
newDiv.innerText = "Hello, I am new here!";
document.body.appendChild(newDiv);
```

---

### 3. What is Event Bubbling and how does it work?

- **Event Bubbling** হলো একটি প্রক্রিয়া যেখানে কোনো child element এ event ঘটলে, সেটা প্রথমে child → তারপর parent → grandparent → document → window পর্যন্ত উপরে উপরে propagate হয়।
- Default behavior হলো event bubbling।

👉 Example:

```js
document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked!");
});
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked!");
});
```

➡ এখানে child এ ক্লিক করলে parent এর event ও trigger হবে।

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

- **Event Delegation** হলো parent element এ একটি event listener বসানো, যাতে সব child element এর জন্য আলাদা listener না বসিয়েও কাজ হয়।
- **Benefits**:
  - Performance ভালো থাকে (একাধিক listener লাগেনা)।
  - Dynamically add হওয়া নতুন child element এর জন্যও কাজ করে।

👉 Example:

```js
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("List item clicked:", e.target.innerText);
  }
});
```

---

### 5. Difference between **preventDefault() and stopPropagation()**

- **preventDefault()**

  - কোনো event এর default action বন্ধ করে।
  - যেমন: `<a>` ট্যাগে ক্লিক করলে redirect হওয়া বন্ধ করবে।
  - Example:
    ```js
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Link click prevented!");
    });
    ```

- **stopPropagation()**
  - Event bubbling বা capturing বন্ধ করে।
  - অর্থাৎ child এ event ঘটলে সেটা parent এ propagate করবে না।
  - Example:
    ```js
    child.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("Only child clicked, parent won’t trigger");
    });
    ```

---

✨ **End of Readme** ✨
