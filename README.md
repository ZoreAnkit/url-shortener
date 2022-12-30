<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Url Shortener</h3>

  <p align="center">
   Laravel - Vue url-shortener with login System
    <br />
    ·
    <a href="https://github.com/ZoreAnkit/url-shortener/issues">Report Bug</a>
    ·
    <a href="https://github.com/ZoreAnkit/url-shortener/issues">Request Feature</a>
  </p>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
[screencast-nimbus-capture-2022.12.28-16_57_28.webm](https://user-images.githubusercontent.com/46300882/209805580-b86bef10-7559-48ff-9300-694bfb66cded.webm)

This project is an admin panel that includes user login functionality. It allows users to create short URLs using Vue 3 in the frontend, along with Pinia store for state management and services to make API calls for inserting, updating, and selecting data. The frontend communicates with the backend via APIs, allowing for a flexible and decoupled architecture.

The project utilizes Laravel Sanctum for authentication, which is a built-in feature that provides secure, stateless authentication for single-page applications.

The project also includes a static pricing page, which allows users to create a maximum of 10 short URLs. However, in future updates, we plan to expand the options available to users by offering packages that allow for the creation of additional URLs. This feature will enable users to tailor the service to their specific needs and use cases.

Future update:
Users can buy packages to create more urls.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Vue.js](https://vuejs.org/)
- [Laravel](https://laravel.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

sql file is included in repo to import directly in local database. Perform mentioned steps to have project running locally

### Prerequisites

Requires minimum Versions

1. Vue - ^2.6
2. NPM - 6.13
3. Node - 12.14

<!-- USAGE EXAMPLES -->

## Usage

STEP 1: Clone repo locally.


STEP 2: Navigate to backend folder serve backend. run following commands for migration

```
php artisan migrate
php artisan user:create "admin" "admin@gmail.com" "password" --force

```

STEP 3: Navigate to frontend folder and run following commands


```sh
npm install && npm run dev
```


_For more information on how to install and use plugin, please refer to this (https://github.com/ZoreAnkit/url-shortener)_

<p align="right">(<a href="#top">back to top</a>)</p>

See the [open issues](https://github.com/ZoreAnkit/url-shortener/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ankit Zore - ankitzore2@gmail.com

Project Link: [https://github.com/ZoreAnkit/url-shortener](https://github.com/ZoreAnkit/url-shortener)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


