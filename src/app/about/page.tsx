import InfoPage from '@/components/InfoPage'

export const metadata = {
  title: 'About — Wafer News',
  description:
    'About Wafer News — our mission, how we curate the day’s top stories, and how to reach us.',
}

export default function AboutPage() {
  return (
    <InfoPage
      title="About Wafer News"
      kicker="About"
      updated="May 6, 2026"
      intro="Wafer News is a clean, personalized daily news experience. We pull together the most important headlines across world, business, technology, sports, science, opinion and culture — then get out of your way."
    >
      <h2>Our mission</h2>
      <p>
        Every day, more news is published than any one person can possibly read. Wafer News
        exists to cut through that noise: a fast, ad-light, distraction-free reading experience
        focused on what actually matters today, organized around the topics you care about.
      </p>

      <h2>How we curate</h2>
      <p>
        Stories on Wafer News are organized into clearly labeled sections — Top stories, Hot,
        Live, Politics, Business, Technology, Sports, Culture and Opinion. Front-page placement is
        based on a mix of editorial weight, recency, and what readers are reading right now.
      </p>
      <ul>
        <li>
          <strong>Sources first.</strong> Every headline links back to a source byline so you
          always know who reported it.
        </li>
        <li>
          <strong>No autoplay, no popups.</strong> The page loads fast and stays out of the way.
        </li>
        <li>
          <strong>Built to be read.</strong> Plain black type on white, sized for long stretches
          of reading rather than for scrolling.
        </li>
      </ul>

      <h2>The team</h2>
      <p>
        Wafer News is produced by a small editorial and engineering team. Section desks
        (Politics, Business, Technology, Sports, Culture, Crypto, Live) each curate their own
        feeds, with a shared front page assembled by our top-stories editor.
      </p>

      <h2>Get in touch</h2>
      <p>
        Tip the newsroom, suggest a correction, or just say hi:
      </p>
      <ul>
        <li>
          Editorial: <a href="mailto:editorial@dailyreports.example">editorial@dailyreports.example</a>
        </li>
        <li>
          Tips: <a href="mailto:tips@dailyreports.example">tips@dailyreports.example</a>
        </li>
        <li>
          Press &amp; partnerships: <a href="mailto:press@dailyreports.example">press@dailyreports.example</a>
        </li>
      </ul>

      <div className="info-callout">
        Wafer News is an independent product. We do not currently accept paid placement or
        sponsored stories on the front page.
      </div>
    </InfoPage>
  )
}
