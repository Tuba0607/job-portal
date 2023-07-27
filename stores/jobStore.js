import { defineStore } from "pinia";
import axios from "axios";

export const useJobStore = defineStore("jobStore", {
  state: () => ({
    jobs: [],
    jobDetail: [],
  }),
  actions: {
    async getJobs() {
      try {
        const response = await axios.get(
          "https://64ba4da15e0670a501d5f31f.mockapi.io/jobs/"
        );

        this.jobs = response.data;
        return this.jobs;
      } catch (error) {
        console.error("Error fetching job listings:", error);
        throw new Error("Failed to fetch job listings.");
      }
    },
    async getJobDetail(id) {
      try {
        const response = await axios.get(
          `https://64ba4da15e0670a501d5f31f.mockapi.io/jobdetail/${id}`
        );
        this.jobDetail = response.data;
      } catch (error) {
        this.error = "Failed to fetch job details.";
      }
    },
    async filterJobListings(location, keyword) {
      try {
        if (location || keyword) {
          const filteredList = this.jobs.filter((job) => {
            const locationMatch = location
              ? job.location.toLowerCase().includes(location.toLowerCase())
              : true;
            const keywordMatch = keyword
              ? job.positionName.toLowerCase().includes(keyword.toLowerCase())
              : true;
            return locationMatch && keywordMatch;
          });
          return filteredList;
        } else {
          return this.jobs;
        }
      } catch (error) {
        console.error("Error filtering job listings:", error);
        throw new Error("Failed to filter job listings.");
      }
    },
  },
});
