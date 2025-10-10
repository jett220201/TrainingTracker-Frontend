# TrainingTracker 💪 [FrontEnd] 📱💻

SPA for managing user routines and progress, developed with Vite, React, Tailwind, Axios, Apollo and Zustand.

## 🚀 Technologies Used
- **Vite**
- **React**
- **Tailwind**
- **Axios** ✈️
- **Apollo**
- **Zustand** 🐻
- **i18next** 🌎

[![My Skills](https://skillicons.dev/icons?i=vite,ts,react,tailwind,apollo,npm)](https://skillicons.dev)

### 💎 Features
- Language:
  - English 📘
  - Spanish 📗
- Theme:
  - Light 💡
  - Dark 🌙
- Responsive:
  - Desktop 💻
  - Mobile 📲

### 📂 Project structure
This project has the following structure:
```
📦TrainingTracker-Frontend
┣ 📂public
 ┃ ┣ 📂videos
 ┃ ┃ ┣ 📜4761423-hd_1080_2048_25fps.mp4
 ┃ ┃ ┣ 📜4761426-hd_2048_1080_25fps.mp4
 ┃ ┃ ┣ 📜5319754-hd_1080_1920_25fps.mp4
 ┃ ┃ ┣ 📜5319760-hd_1920_1080_25fps.mp4
 ┃ ┃ ┣ 📜6389061-hd_1080_1920_25fps.mp4
 ┃ ┃ ┗ 📜6390166-hd_1920_1080_25fps.mp4
 ┃ ┗ 📜icon.svg
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂graphql
 ┃ ┃ ┃ ┗ 📂queries
 ┃ ┃ ┃ ┃ ┣ 📜exercises.ts
 ┃ ┃ ┃ ┃ ┣ 📜goals.ts
 ┃ ┃ ┃ ┃ ┣ 📜home.ts
 ┃ ┃ ┃ ┃ ┣ 📜profile.ts
 ┃ ┃ ┃ ┃ ┣ 📜progress.ts
 ┃ ┃ ┃ ┃ ┗ 📜workouts.ts
 ┃ ┃ ┣ 📂rest
 ┃ ┃ ┃ ┣ 📜authApi.ts
 ┃ ┃ ┃ ┣ 📜userApi.ts
 ┃ ┃ ┃ ┣ 📜userGoalsApi.ts
 ┃ ┃ ┃ ┣ 📜userProgressApi.ts
 ┃ ┃ ┃ ┗ 📜workoutApi.ts
 ┃ ┃ ┣ 📜apolloClient.ts
 ┃ ┃ ┗ 📜axiosClient.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜female-profile.png
 ┃ ┃ ┣ 📜female.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜male-profile.png
 ┃ ┃ ┗ 📜male.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Public
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┣ 📜MobileSidebar.tsx
 ┃ ┃ ┃ ┣ 📜Sidebar.tsx
 ┃ ┃ ┃ ┣ 📜TitleHeader.tsx
 ┃ ┃ ┃ ┗ 📜VideoBackground.tsx
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📜AlertBlock.tsx
 ┃ ┃ ┃ ┣ 📜ExerciseCard.tsx
 ┃ ┃ ┃ ┣ 📜ExercisesList.tsx
 ┃ ┃ ┃ ┣ 📜FeatureIcon.tsx
 ┃ ┃ ┃ ┣ 📜GoalCard.tsx
 ┃ ┃ ┃ ┣ 📜IconButton.tsx
 ┃ ┃ ┃ ┣ 📜IconInput.tsx
 ┃ ┃ ┃ ┣ 📜IconLink.tsx
 ┃ ┃ ┃ ┣ 📜InfoCard.tsx
 ┃ ┃ ┃ ┣ 📜LineChartGraph.tsx
 ┃ ┃ ┃ ┣ 📜MinimalExerciseCard.tsx
 ┃ ┃ ┃ ┣ 📜SettingCard.tsx
 ┃ ┃ ┃ ┣ 📜WorkoutCard.tsx
 ┃ ┃ ┃ ┣ 📜WorkoutExerciseForm.tsx
 ┃ ┃ ┃ ┣ 📜WorkoutMinimalCard.tsx
 ┃ ┃ ┃ ┗ 📜WorkoutPlayerBar.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useTheme.ts
 ┃ ┣ 📂i18n
 ┃ ┃ ┣ 📂en
 ┃ ┃ ┃ ┣ 📜about.json
 ┃ ┃ ┃ ┣ 📜common.json
 ┃ ┃ ┃ ┣ 📜exercises.json
 ┃ ┃ ┃ ┣ 📜goals.json
 ┃ ┃ ┃ ┣ 📜home.json
 ┃ ┃ ┃ ┣ 📜login.json
 ┃ ┃ ┃ ┣ 📜password.json
 ┃ ┃ ┃ ┣ 📜profile.json
 ┃ ┃ ┃ ┣ 📜progress.json
 ┃ ┃ ┃ ┣ 📜register.json
 ┃ ┃ ┃ ┣ 📜settings.json
 ┃ ┃ ┃ ┗ 📜workouts.json
 ┃ ┃ ┗ 📂es
 ┃ ┃ ┃ ┣ 📜about.json
 ┃ ┃ ┃ ┣ 📜common.json
 ┃ ┃ ┃ ┣ 📜exercises.json
 ┃ ┃ ┃ ┣ 📜goals.json
 ┃ ┃ ┃ ┣ 📜home.json
 ┃ ┃ ┃ ┣ 📜login.json
 ┃ ┃ ┃ ┣ 📜password.json
 ┃ ┃ ┃ ┣ 📜profile.json
 ┃ ┃ ┃ ┣ 📜progress.json
 ┃ ┃ ┃ ┣ 📜register.json
 ┃ ┃ ┃ ┣ 📜settings.json
 ┃ ┃ ┃ ┗ 📜workouts.json
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📜PrivateLayout.tsx
 ┃ ┃ ┗ 📜PublicLayout.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜About.tsx
 ┃ ┃ ┣ 📜ErrorPage.tsx
 ┃ ┃ ┣ 📜Exercises.tsx
 ┃ ┃ ┣ 📜ForgotPassword.tsx
 ┃ ┃ ┣ 📜Goals.tsx
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┣ 📜NewWorkout.tsx
 ┃ ┃ ┣ 📜NotFoundPage.tsx
 ┃ ┃ ┣ 📜PrivacyTerms.tsx
 ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┣ 📜Progress.tsx
 ┃ ┃ ┣ 📜RecoveryPassword.tsx
 ┃ ┃ ┣ 📜Register.tsx
 ┃ ┃ ┣ 📜Settings.tsx
 ┃ ┃ ┗ 📜Workouts.tsx
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜AuthStore.ts
 ┃ ┃ ┣ 📜FormStore.ts
 ┃ ┃ ┗ 📜WorkoutStore.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜ApiResponse.ts
 ┃ ┃ ┃ ┣ 📜ErrorResponse.ts
 ┃ ┃ ┃ ┣ 📜LoginRequest.ts
 ┃ ┃ ┃ ┣ 📜UserBasicResponse.ts
 ┃ ┃ ┃ ┣ 📜UserChangeLanguageRequest.ts
 ┃ ┃ ┃ ┣ 📜UserChangePasswordRecoveryRequest.ts
 ┃ ┃ ┃ ┣ 📜UserChangePasswordRequest.ts
 ┃ ┃ ┃ ┣ 📜UserDeleteAccountRequest.ts
 ┃ ┃ ┃ ┣ 📜UserEditRequest.ts
 ┃ ┃ ┃ ┣ 📜UserGoalRequest.ts
 ┃ ┃ ┃ ┣ 📜UserProgressRequest.ts
 ┃ ┃ ┃ ┣ 📜UserRecoveryPasswordRequest.ts
 ┃ ┃ ┃ ┣ 📜UserRegistrationRequest.ts
 ┃ ┃ ┃ ┗ 📜WorkoutsRequest.ts
 ┃ ┃ ┗ 📂general
 ┃ ┃ ┃ ┣ 📜AlertType.ts
 ┃ ┃ ┃ ┣ 📜GenderType.ts
 ┃ ┃ ┃ ┣ 📜GoalDirectionType.ts
 ┃ ┃ ┃ ┣ 📜GoalStatus.ts
 ┃ ┃ ┃ ┣ 📜GoalType.ts
 ┃ ┃ ┃ ┣ 📜MuscleGroupType.ts
 ┃ ┃ ┃ ┗ 📜ThemeType.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜fitnessHelper.ts
 ┃ ┃ ┣ 📜formatDateHelper.ts
 ┃ ┃ ┣ 📜genderMapper.ts
 ┃ ┃ ┣ 📜goalDirectionMapper.ts
 ┃ ┃ ┗ 📜goalTypeMapper.ts
 ┃ ┣ 📜i18n.ts
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.gitignore
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜LICENSE.txt
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```

### 🔥 Installing
1. Clone the repository:
```sh
  git clone https://github.com/jett220201/TrainingTracker-Frontend.git
  cd .\TrainingTracker-Frontend\
```
2. Restore packages:
```sh
   npm install
```
3. Run:
```sh
  npm run dev
```
4. Login or create an account
5. Enjoy!

## 🧠 Future features
- Deploy the platform!

## ⚙️ Backend project
https://github.com/jett220201/TrainingTracker

## :octocat: Authors
  - **Juan Esteban Torres Tamayo**

## 📜 License
This project is licensed under the [MIT](LICENSE.md)
License - see the [LICENSE.md](LICENSE.md) file for
details.
 
