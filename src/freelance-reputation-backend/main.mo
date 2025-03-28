import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

import Float "mo:base/Float"; 

actor FreelancerReputation {

    type Review = {
        rating : Nat;
        reviewText : Text;
    };

    type Freelancer = {
        name : Text;
        skills : [Text];
        reviews : [Review];
    };

    stable var freelancerIds : [Text] = [];
    var freelancers = HashMap.HashMap<Text, Freelancer>(10, Text.equal, Text.hash);

    system func preupgrade() {
        freelancerIds := Iter.toArray(freelancers.keys());
    };

    system func postupgrade() {
        freelancers := HashMap.HashMap<Text, Freelancer>(10, Text.equal, Text.hash);
    };

    public func addFreelancer(id : Text, name : Text, skills : [Text]) : async () {
        let newFreelancer = {
            name = name;
            skills = skills;
            reviews = [];
        };
        freelancers.put(id, newFreelancer);
        freelancerIds := Array.append(freelancerIds, [id]);
    };

    public query func getFreelancer(id : Text) : async ?Freelancer {
        return freelancers.get(id);
    };

    public func addReview(id : Text, rating : Nat, reviewText : Text) : async Bool {
        let freelancerOpt = freelancers.get(id);
        switch (freelancerOpt) {
            case (null) { return false };
            case (?freelancer) {
                let updatedFreelancer = {
                    name = freelancer.name;
                    skills = freelancer.skills;
                    reviews = Array.append(freelancer.reviews, [{ rating = rating; reviewText = reviewText }]);
                };
                freelancers.put(id, updatedFreelancer);
                return true;
            };
        };
    };

    public query func getFreelancerRating(id : Text) : async ?Float {
        switch (freelancers.get(id)) {
            case (null) { return null };
            case (?freelancer) {
                let ratings : [Nat] = Array.map<Review, Nat>(freelancer.reviews, func(review : Review) : Nat { review.rating }); // ✅ Fix: Corrected Array.map syntax
                
                if (Array.size(ratings) == 0) return ?0.0;
                
                let sum = Array.foldLeft<Nat, Nat>(ratings, 0, func(acc, x) { acc + x });
                
                return ?(Float.fromInt(sum) / Float.fromInt(Array.size(ratings)));
            };
        };
    };
};
