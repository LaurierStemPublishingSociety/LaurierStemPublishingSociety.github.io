/**
 * One person on the Our team page.
 * If there's no photo, their initials are shown instead.
 */
import { imageSrc } from "@/lib/text";
import type { TeamMember } from "@/lib/types";

// "focus" in content/team.json -> which part of the photo to keep when it's cropped
const cropPositions = {
  top: "50% 18%",
  center: "50% 40%",
  bottom: "50% 85%",
};

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="member">
      <div className="photo">
        {member.photo ? (
          <img
            src={imageSrc(member.photo)}
            alt={`Photo of ${member.name}`}
            loading="lazy"
            style={{ objectPosition: cropPositions[member.focus ?? "center"] }}
          />
        ) : (
          <span className="initials" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>
      <h3>{member.name}</h3>
      {member.role && <p className="role">{member.role}</p>}
      {member.bio && <p className="bio">{member.bio}</p>}
      {member.linkedin && (
        <a className="text-link member-link" href={member.linkedin}>
          LinkedIn profile
        </a>
      )}
    </article>
  );
}
