import { useState } from "react";

import ApplicationNavigationButtons from "./ApplicationNavigationButtons";
import ApplicationProgressBar from "./ApplicationProgressBar";

export default function Application() {
  const [currentStep, setCurrentStep] = useState(0);
  const [latestCompletedStep, setLatestCompletedStep] = useState(0);

  return (
    <div style={{ marginBottom: "3em" }}>
      <ApplicationProgressBar
        stepNames={[
          "Choose Club",
          "Personal Information",
          "Questions",
          "Upload Documents",
          "Review",
          "Submit",
        ]}
        currentStep={currentStep}
        onChange={setCurrentStep}
        latestCompletedStep={latestCompletedStep}
        tabPanels={[
          "First page of application",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu volutpat libero, nec imperdiet neque. Nunc commodo ultricies imperdiet. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris bibendum sapien ac semper cursus. Donec eu arcu massa. Sed maximus tortor ex, in blandit lacus laoreet id. Integer sit amet lorem ligula. Sed dignissim eros quam, bibendum vehicula nulla sollicitudin eget. Nunc vulputate augue eu risus hendrerit iaculis. Aliquam sit amet porttitor diam. Sed porta, lorem vitae vulputate fermentum, dolor ante placerat turpis, eget scelerisque nisl est et neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam vulputate eleifend ante eu gravida. Integer a ligula libero. Donec gravida eu est a scelerisque. Vestibulum nulla magna, suscipit et sapien eget, malesuada sollicitudin tortor. Cras condimentum et erat a fringilla. Duis eu ex eu sapien ullamcorper sagittis vitae eu eros. Ut quis leo sagittis, eleifend sapien sed, imperdiet mauris. Integer rutrum sapien quis tellus porttitor suscipit. Ut et iaculis mi, at porttitor erat. Proin ut euismod quam. Maecenas leo justo, finibus eu lacus eu, mattis porta nulla. In placerat pulvinar gravida. Vivamus venenatis semper orci, non rhoncus felis cursus quis. Etiam venenatis bibendum turpis vitae aliquam.          Donec lobortis enim dui, ut luctus odio convallis eu. Ut massa tortor, rutrum et ullamcorper nec, egestas vel odio. Quisque at bibendum odio. Sed ac enim sit amet enim tristique rutrum. Quisque ac faucibus magna. Donec sagittis dolor turpis, in facilisis ex vehicula ac. Vestibulum euismod rutrum rutrum. Duis in risus efficitur, molestie ex et, ultricies odio. Nulla eu velit massa. Morbi varius tempus libero efficitur rutrum. Aliquam sit amet hendrerit quam, id porta arcu. Donec eget dignissim elit. In varius placerat justo, tincidunt commodo lacus porta non. Morbi sed orci eu felis porta hendrerit. Fusce ut lectus at dolor suscipit eleifend. Nulla mattis vitae urna sed convallis.         Curabitur finibus elit eget nisi posuere, quis cursus dui fermentum. Vestibulum vitae orci scelerisque, auctor tellus gravida, ultricies odio. Aliquam erat volutpat. Morbi a metus massa. Aenean et lectus pharetra, gravida dui nec, ultrices erat. Sed maximus tempus dui, quis ornare ex. Aenean maximus fermentum suscipit. Etiam cursus, quam a ullamcorper mattis, nisi turpis iaculis ipsum, nec vehicula nibh mi ac orci.      Ut volutpat libero at arcu placerat, nec pellentesque libero varius. Etiam et velit in lacus ultrices sollicitudin in quis leo. Nunc condimentum vel lectus nec mollis. Aenean pharetra nisl vel consequat fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi finibus volutpat velit nec consectetur. Ut risus orci, ultrices gravida feugiat gravida, faucibus vitae sem. Ut vitae euismod urna. In et pulvinar tellus, in vehicula eros.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu volutpat libero, nec imperdiet neque. Nunc commodo ultricies imperdiet. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris bibendum sapien ac semper cursus. Donec eu arcu massa. Sed maximus tortor ex, in blandit lacus laoreet id. Integer sit amet lorem ligula. Sed dignissim eros quam, bibendum vehicula nulla sollicitudin eget. Nunc vulputate augue eu risus hendrerit iaculis. Aliquam sit amet porttitor diam. Sed porta, lorem vitae vulputate fermentum, dolor ante placerat turpis, eget scelerisque nisl est et neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam vulputate eleifend ante eu gravida. Integer a ligula libero. Donec gravida eu est a scelerisque. Vestibulum nulla magna, suscipit et sapien eget, malesuada sollicitudin tortor. Cras condimentum et erat a fringilla. Duis eu ex eu sapien ullamcorper sagittis vitae eu eros. Ut quis leo sagittis, eleifend sapien sed, imperdiet mauris. Integer rutrum sapien quis tellus porttitor suscipit. Ut et iaculis mi, at porttitor erat. Proin ut euismod quam. Maecenas leo justo, finibus eu lacus eu, mattis porta nulla. In placerat pulvinar gravida. Vivamus venenatis semper orci, non rhoncus felis cursus quis. Etiam venenatis bibendum turpis vitae aliquam.          Donec lobortis enim dui, ut luctus odio convallis eu. Ut massa tortor, rutrum et ullamcorper nec, egestas vel odio. Quisque at bibendum odio. Sed ac enim sit amet enim tristique rutrum. Quisque ac faucibus magna. Donec sagittis dolor turpis, in facilisis ex vehicula ac. Vestibulum euismod rutrum rutrum. Duis in risus efficitur, molestie ex et, ultricies odio. Nulla eu velit massa. Morbi varius tempus libero efficitur rutrum. Aliquam sit amet hendrerit quam, id porta arcu. Donec eget dignissim elit. In varius placerat justo, tincidunt commodo lacus porta non. Morbi sed orci eu felis porta hendrerit. Fusce ut lectus at dolor suscipit eleifend. Nulla mattis vitae urna sed convallis.         Curabitur finibus elit eget nisi posuere, quis cursus dui fermentum. Vestibulum vitae orci scelerisque, auctor tellus gravida, ultricies odio. Aliquam erat volutpat. Morbi a metus massa. Aenean et lectus pharetra, gravida dui nec, ultrices erat. Sed maximus tempus dui, quis ornare ex. Aenean maximus fermentum suscipit. Etiam cursus, quam a ullamcorper mattis, nisi turpis iaculis ipsum, nec vehicula nibh mi ac orci.      Ut volutpat libero at arcu placerat, nec pellentesque libero varius. Etiam et velit in lacus ultrices sollicitudin in quis leo. Nunc condimentum vel lectus nec mollis. Aenean pharetra nisl vel consequat fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi finibus volutpat velit nec consectetur. Ut risus orci, ultrices gravida feugiat gravida, faucibus vitae sem. Ut vitae euismod urna. In et pulvinar tellus, in vehicula eros.",
          "Third page of application",
          "Fourth page of application",
          "Fifth page of application",
          "Sixth page of application",
        ]}
      />
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          paddingRight: "16px",
          width: "100%",
        }}
      >
        <ApplicationNavigationButtons
          currentStepUpdater={setCurrentStep}
          lastCompletedStepUpdater={setLatestCompletedStep}
          currentStep={currentStep}
          lastCompletedStep={latestCompletedStep}
          numSteps={6}
        />
      </footer>
    </div>
  );
}
