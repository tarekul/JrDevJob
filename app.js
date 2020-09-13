document.addEventListener("DOMContentLoaded", () => {
  const jobs = document.querySelector(".jobs");
  const input = document.querySelector("input");
  input.addEventListener("keyup", (e) => {
    if (e.target.value === "") {
      jobs.innerHTML = "";
      crtJbLstngFrmFilter(githubJobs);
    } else if (e.keyCode === 13) {
      let search = e.target.value;
      search = search.toLowerCase();
      filteredJobs = githubJobs.filter((job) => {
        if (job.title.toLowerCase().includes(search)) return true;
        else if (job.description.toLowerCase().includes(search)) return true;
        else if (job.location.toLowerCase().includes(search)) return true;
        return false;
      });
      jobs.innerHTML = "";
      crtJbLstngFrmFilter(filteredJobs);
    }
  });

  var githubJobs;
  var filteredJobs;

  async function getJobs() {
    const res = await fetch("https://jobfetchapi.herokuapp.com/jobs");
    githubJobs = await res.json();
  }

  function createJobCard(job) {
    const card = document.createElement("div");
    var cardClass = document.createAttribute("class");
    cardClass.value = "cardd";
    card.setAttributeNode(cardClass);

    const title = document.createElement("h5");
    const titleClass = document.createAttribute("class");
    titleClass.value = "title";
    title.setAttributeNode(titleClass);
    title.innerText = job.title;

    if (job.company_logo) {
      const logo = document.createElement("img");
      const logoSrc = document.createAttribute("src");
      logoSrc.value = job.company_logo;
      logo.setAttributeNode(logoSrc);
      card.appendChild(logo);
    }

    const company = document.createElement("h5");
    const compClass = document.createAttribute("class");
    compClass.value = "company";
    company.setAttributeNode(compClass);
    company.innerText = job.company;

    const location = document.createElement("div");
    const locClass = document.createAttribute("class");
    locClass.value = "location";
    location.setAttributeNode(locClass);
    location.innerText = `Location: ${job.location}`;

    const date = document.createElement("div");
    const dateClass = document.createAttribute("class");
    dateClass.value = "date";
    date.setAttributeNode(dateClass);
    date.innerText = `Date Posted: ${new Date(job.created_at).toDateString()}`;

    const type = document.createElement("div");
    type.innerText = job.type;

    card.appendChild(title);

    card.appendChild(company);
    card.appendChild(location);
    card.appendChild(date);
    card.appendChild(type);

    const dataToggle = document.createAttribute("data-toggle");
    dataToggle.value = "modal";
    card.setAttributeNode(dataToggle);
    const dataTarget = document.createAttribute("data-target");
    dataTarget.value = ".bd-example-modal-lg";
    card.setAttributeNode(dataTarget);

    card.addEventListener("click", () => {
      document.querySelector(".modal-title").innerText = job.title;
      const body = document.querySelector(".modal-body");
      body.innerHTML = job.description;
      body.innerHTML += job.how_to_apply;
    });

    jobs.appendChild(card);
  }

  async function createJobListing() {
    await getJobs();
    for (let job of githubJobs) {
      createJobCard(job);
    }
  }

  function crtJbLstngFrmFilter(jobs) {
    for (let job of jobs) {
      createJobCard(job);
    }
  }

  createJobListing();
});
