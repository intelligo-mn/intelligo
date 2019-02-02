<template>
    <div>
        <hero></hero>
        <download-section></download-section>
    </div>
</template>
<script>
import Hero from "./components/Hero";
import DownloadSection from "./components/DownloadSection";

export default {
  name: "components",
  components: {
    Hero,
    DownloadSection
  }
};
</script>
