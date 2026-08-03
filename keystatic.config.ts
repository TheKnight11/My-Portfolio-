import { config, fields, singleton, collection } from '@keystatic/core';

const iconOptions = [
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter / X', value: 'twitter' },
  { label: 'Strava', value: 'strava' },
  { label: 'Email', value: 'email' },
  { label: 'World Cube Association', value: 'wca' },
  { label: 'Other (generic globe icon)', value: 'globe' },
];

export default config({
  storage: {
    kind: 'github',
    repo: 'TheKnight11/My-Portfolio-', // TODO: confirm this matches your repo exactly
  },

  singletons: {
    // ------------------------------------------------------------
    // SITE SETTINGS — single source of truth for name, email, avatar,
    // and social links. Hero, Contact, and the footer all read from here.
    // ------------------------------------------------------------
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings/general',
      format: 'yaml',
      schema: {
        siteName: fields.text({ label: 'Site Name (browser tab / nav)' }),
        fullName: fields.text({ label: 'Full Name' }),
        tagline: fields.text({
          label: 'Tagline / Bio',
          multiline: true,
        }),
        email: fields.text({ label: 'Email Address', validation: { isRequired: true } }),
        avatar: fields.image({
          label: 'Profile Avatar / Hero Photo',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        favicon: fields.image({
          label: 'Favicon',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        footerText: fields.text({ label: 'Footer Text' }),
        resumeFile: fields.file({
          label: 'Résumé (PDF)',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: 'Platform Name (e.g. GitHub, Strava)' }),
            icon: fields.select({
              label: 'Icon',
              options: iconOptions,
              defaultValue: 'globe',
            }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.platform.value || 'New link',
          }
        ),
      },
    }),

    // ------------------------------------------------------------
    // HOMEPAGE SECTIONS
    // Each singleton = one file in src/content/sections/. `order` +
    // `visible` control position and show/hide on the page.
    // ------------------------------------------------------------
    sectionHero: singleton({
      label: 'Section: Hero',
      path: 'src/content/sections/hero',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order (lower = higher on page)', defaultValue: 1 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        eyebrow: fields.text({ label: 'Eyebrow / Location line' }),
        heroImage: fields.image({
          label: 'Hero Photo (optional — overrides the avatar from Site Settings)',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        ctaButtons: fields.array(
          fields.object({
            label: fields.text({ label: 'Button Label' }),
            url: fields.text({ label: 'URL' }),
          }),
          { label: 'Call-to-Action Buttons', itemLabel: (props) => props.fields.label.value || 'Button' }
        ),
        body: fields.markdoc({ label: 'Short Intro Text' }),
      },
    }),

    sectionAbout: singleton({
      label: 'Section: About',
      path: 'src/content/sections/about',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order', defaultValue: 2 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        aboutTitle: fields.text({ label: 'Title' }),
        aboutImage: fields.image({
          label: 'Photo (optional)',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        values: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description' }),
          }),
          { label: 'Core Values', itemLabel: (props) => props.fields.title.value || 'Value' }
        ),
        body: fields.markdoc({ label: 'Body' }),
      },
    }),

    sectionProjects: singleton({
      label: 'Section: Projects',
      path: 'src/content/sections/projects',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order', defaultValue: 3 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        projectsTitle: fields.text({ label: 'Title' }),
        projectsSubtitle: fields.text({ label: 'Subtitle' }),
        body: fields.markdoc({ label: 'Body (optional, unused)' }),
      },
    }),

    sectionSkills: singleton({
      label: 'Section: Skills',
      path: 'src/content/sections/skills',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order', defaultValue: 4 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        skillGroups: fields.array(
          fields.object({
            groupName: fields.text({ label: 'Group Name' }),
            items: fields.array(fields.text({ label: 'Item' }), {
              label: 'Items',
              itemLabel: (props) => props.value || 'Item',
            }),
          }),
          { label: 'Skill Groups', itemLabel: (props) => props.fields.groupName.value || 'Group' }
        ),
        body: fields.markdoc({ label: 'Body (optional, unused)' }),
      },
    }),

    sectionBlogTeaser: singleton({
      label: 'Section: Blog',
      path: 'src/content/sections/blog-teaser',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order', defaultValue: 6 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        blogTitle: fields.text({ label: 'Title' }),
        blogSubtitle: fields.text({ label: 'Subtitle' }),
        body: fields.markdoc({ label: 'Body (optional, unused)' }),
      },
    }),

    sectionContact: singleton({
      label: 'Section: Contact',
      path: 'src/content/sections/contact',
      format: { contentField: 'body' },
      schema: {
        order: fields.integer({ label: 'Order', defaultValue: 5 }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        contactFormEndpoint: fields.text({
          label: 'Form Endpoint (optional, e.g. a Formspree URL)',
        }),
        body: fields.markdoc({ label: 'Intro Text' }),
      },
    }),
  },

  collections: {
    // ------------------------------------------------------------
    // PROJECTS — add / remove / reorder freely
    // ------------------------------------------------------------
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        liveUrl: fields.text({ label: 'Live URL' }),
        repoUrl: fields.text({ label: 'Repository URL' }),
        downloadFile: fields.file({
          label: 'Downloadable File (PDF, etc.)',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        body: fields.markdoc({ label: 'Full Write-up' }),
      },
    }),

    // ------------------------------------------------------------
    // BLOG — draft / edit / publish / delete freely
    // ------------------------------------------------------------
    blog: collection({
      label: 'Blog Posts',
      path: 'src/content/blog/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publish Date' }),
        category: fields.text({ label: 'Category' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        downloadFile: fields.file({
          label: 'Downloadable File (PDF, etc.)',
          directory: 'public/uploads',
          publicPath: '/uploads/',
        }),
        draft: fields.checkbox({ label: 'Draft (hide from site)', defaultValue: true }),
        body: fields.markdoc({ label: 'Article Body' }),
      },
    }),
  },
});
