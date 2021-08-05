const layouts = [
  'basic_landing_page',
  'campaign_landing_page',
  'event',
  'event_listing',
  'faq_multiple_q_a',
  'health_care_local_facility',
  'health_care_region_detail_page',
  'health_care_region_page',
  'health_services_listing',
  'home',
  'landing_page',
  'leadership_listing',
  'locations_listing',
  'news_story',
  'office',
  'page',
  'person_profile',
  'press_release',
  'press_releases_listing',
  'publication_listing',
  'q_a',
  'step_by_step',
  'story_listing',
  'support_resources_detail_page',
  'va_form',
  'vamc_operating_status_and_alerts',
  'vamc_system_policies_page',
  'vet_center',
];

describe('Templates', () => {
  layouts.forEach(layout => {
    it(`should match snapshot for layout: ${layout}`, () => {
      cy.visit(`/preview?template=${layout}`);
      cy.matchImageSnapshot(`${layout}`);
    });
  });
});
