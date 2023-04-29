// getting reference of the stats counting
const stat_one = document.querySelector('.stat1 .counting');
const stat_two = document.querySelector('.stat2 .counting');
const stat_three = document.querySelector('.stat3 .counting');
const stat_four = document.querySelector('.stat4 .counting');

// function for counting
function counting(target,total,count) {
    let id = setInterval(() => {
        if (count <= total) {
            target.innerHTML = `${count}`;
            count++;
        }
    }, 10);
    setTimeout(() => {
        clearInterval(id);
    }, 3000);
    
}
// defining intersection observer
const observer1 = new IntersectionObserver(entry => {
    if (entry[0].isIntersecting) {
        counting(entry[0].target, 97, 0);
        observer1.unobserve(entry[0].target);
        
    }
}, {
    threshold:0.5,
})
const observer2 = new IntersectionObserver(entry => {
    if (entry[0].isIntersecting) {
        counting(entry[0].target, 97, 0);
        observer2.unobserve(entry[0].target);
        
    }
}, {
    threshold:0.7,
})
const observer3 = new IntersectionObserver(entry => {
    if (entry[0].isIntersecting) {
        counting(entry[0].target, 97, 0);
        observer3.unobserve(entry[0].target);
        
    }
}, {
    threshold:0.7,
})
const observer4 = new IntersectionObserver(entry => {
    if (entry[0].isIntersecting) {
        counting(entry[0].target, 97, 0);
        observer4.unobserve(entry[0].target);
        
    }
}, {
    threshold:0.7,
})

observer1.observe(stat_one);
observer2.observe(stat_two);
observer3.observe(stat_three);
observer4.observe(stat_four);