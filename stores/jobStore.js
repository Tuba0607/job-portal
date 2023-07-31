import { defineStore } from "pinia";
import axios from "axios";

export const useJobStore = defineStore("jobStore", {
  state: () => ({
    jobs: [],
    jobDetail: {},
  }),
  actions: {
    async getJobs() {
      try {
        const localJobs = localStorage.getItem("jobs");
        if (localJobs) {
          this.jobs = JSON.parse(localJobs);
        } else {
          const response = await axios.get(
            "https://64ba4da15e0670a501d5f31f.mockapi.io/jobs/"
          );

          this.jobs = response.data;

          localStorage.setItem("jobs", JSON.stringify(response.data));
        }
        return this.jobs;
      } catch (error) {
        console.error("Error fetching job listings:", error);

        if (error.response && error.response.status === 404) {
          throw new Error("İş ilanları bulunamadı.");
        } else if (error.response && error.response.status === 500) {
          throw new Error("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
        } else {
          throw new Error(
            "İş ilanları alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
          );
        }
      }
    },
    async getJobDetail(id) {
      try {
        const localJobDetail = localStorage.getItem(`jobDetail_${id}`);
        if (localJobDetail) {
          this.jobDetail = JSON.parse(localJobDetail);
        } else {
          const response = await axios.get(
            `https://64ba4da15e0670a501d5f31f.mockapi.io/jobdetail/${id}`
          );
          this.jobDetail = response.data;

          localStorage.setItem(
            `jobDetail_${id}`,
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (error.response && error.response.status === 404) {
          throw new Error("İş detayı bulunamadı.");
        } else if (error.response && error.response.status === 500) {
          throw new Error("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
        } else {
          throw new Error(
            "İş detayları alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
          );
        }
      }
    },
    async filterJobListings(location, keyword) {
      try {
        if (!location && !keyword) {
          return this.jobs;
        }

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
      } catch (error) {
        console.error("Error filtering job listings:", error);
        throw new Error("Failed to filter job listings.");
      }
    },
  },
});
