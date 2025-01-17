# Graduating Badgers (Team 1 for PBS WI)

Repository Link: [https://github.com/Ruikang-L23/PBS1_GraduatingBadgers/blob/main/README.md](https://github.com/Ruikang-L23/PBS1_GraduatingBadgers/blob/main/README.md)

## Running the Project

**Backend:**
1. Navigate to the transcript-back-end folder.
2. Install necessary dependencies using pip. You will probably have to run these commands:
-  `pip install flask`
-  `pip install flask_cors`
-  `pip install openai==0.28`
-  `pip install pycaption`
4. Create a system environment variable on your machine with the variable name being "OpenAI" and the variable value being the API key. You probably have to restart your PC afterwards.
5. Start the API on your machine by typing `python api.py` into your terminal.
6. (Optional) If you are running the API uncontainerized, you may have to switch the URLs being targeted by fetch in UploadPage.jsx.

**Frontend:**
1. Navigate to the transcript-front-end folder.
2. Run `npm install` to install necessary dependencies for the frontend.
3. Run `npm run dev` to start up the frontend on your machine.

**Normally, you could also navigate to the root of the project and run `docker-compose up` to run both the backend and frontend on Docker. However, this isn't completely working yet (more about this at the bottom of this README).**

## How the Code Works:

When a user uploads a transcript file on the webpage, the frontend sends two requests to the backend: the first request for a normal transcript, and the second request for the AI transcript. For both requests, the backend uses various functions (using Python) to format the transcript. The second request also uses AI to further enhance the transcript for better readability. The backend almost immediately returns the first request for the normal transcript to the frontend. On the other hand, it usually takes 1.5 - 3 minutes for the backend to process the AI transcript before returning it to the frontend. 

## What Works & What Doesn’t:

Most of the basic functions work, including uploading a file, viewing and scrolling through a transcript, switching between the normal transcript and the AI transcript, and various other features such as Dark Mode, increasing/decreasing text size, downloading the HTML of the transcript, and persistence of the transcripts a after refreshing the page.

There are some minor bugs. For example, when the backend finally finishes processing the AI transcript and sends it back to the frontend, the webpage won't automatically show the AI transcript like it should. Instead, the user has to switch back to the normal transcript and then back to the AI transcript for it to show. Additionally, as of 5/10/24, Docker is not working as intended (more about this below).

## What's Next?

NPM has a [known bug](https://github.com/npm/cli/issues/4828) that causes it to ignore optional dependencies when using Docker. However, the backend container works and can run with a localized frontend; this can be done by running `npm run dev` on a local machine to run a local frontend, and this will work with the containerized backend functions.

Some additional features that this project would benefit from include:
- Fixing the bugs listed above
- Adding multi-language transcript support
- Adding the ability for a user to search the transcript by keyword or timestamp
- Making dashes (-) in the transcript be on their own line with contextual paragraph combining
- Improving the appearance of the webpage
- Adding animations to make the webpage more modern
- Anything to improve the user experience.
