"use strict";

function getRepos(searchTerm) {
  const url = `https://api.github.com/users/${searchTerm}/repos`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayRepos(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();

  for (let i = 0; i < responseJson.length; i++) {
    $("#results-list").append(
      `<li>
      <p>Repo name: ${responseJson[i].name}</p>
      <p>Link to repo: <a href="${responseJson[i].url}">${responseJson[i].name}</a></p>
      </li>`
    );
  }

  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    getRepos(searchTerm);
  });
}

$(watchForm);
